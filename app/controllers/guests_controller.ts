import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'
import InvitationKey from '#models/invitation_key'
import shortuuid from 'short-uuid'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class GuestsController {
  async getGuestList({ response }: HttpContext) {
    const families = await FamilyInvitation.query()
      .preload('guests')
      .select('id', 'familyName', 'isAttending', 'noOfGuestsAttending', 'maxGuests', 'updatedAt')
    return response.status(200).send(families)
  }

  async getGuestById({ params, response }: HttpContext) {
    const guest = await FamilyInvitation.query()
      .select('id', 'guestNames', 'isAttending', 'noOfGuestsAttending', 'maxGuests')
      .where('id', params.id)
      .first()

    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    return response.status(200).send(guest)
  }

  async getTotalKidsBelow7({ response }: HttpContext) {
    const total = await FamilyInvitationGuest.query()
      .where('name', 'LIKE', '%below 7%')
      .count('* as count')
    return response.status(200).send({ count: total[0].$extras.count })
  }

  async createGuest({ request, response }: HttpContext) {
    const createGuestSchema = vine.object({
      familyName: vine.string().trim().maxLength(255),
      maxGuests: vine.number().withoutDecimals().min(1).max(20),
      guests: vine.array(
        vine.object({
          name: vine.string().trim().maxLength(255),
          tableNumber: vine.string().trim().optional(),
        })
      ),
    })

    let payload
    try {
      payload = await vine.validate({ schema: createGuestSchema, data: request.all() })
    } catch (error) {
      const messages = error instanceof Error ? (error as any).messages : error
      console.log('Error processing bbb: ', messages)
      return response.status(422).send({ error: messages })
    }

    try {
      await db.transaction(async (trx) => {
        const family = await FamilyInvitation.create(
          {
            familyName: payload.familyName,
            maxGuests: payload.maxGuests,
          },
          { client: trx }
        )

        await family.related('guests').createMany(
          payload.guests.map((guest) => ({
            ...guest,
            tableNumber: guest.tableNumber ?? null,
          })),
          { client: trx }
        )
      })

      return response.status(201).send({ message: 'Family and guests created successfully' })
    } catch (error) {
      console.log('Error processing creating guest: ', error instanceof Error ? error.message : error)
      return response.status(500).send({ error: 'Failed to create family and guests' })
    }
  }

  async updateGuest({ request, response }: HttpContext) {
    const updateGuestSchema = vine.object({
      id: vine.number(),
      familyName: vine.string().trim().maxLength(255),
      maxGuests: vine.number().withoutDecimals().min(1).max(20),
      isAttending: vine.boolean().optional(),
      noOfGuestsAttending: vine.number().withoutDecimals().min(0),
      guests: vine.array(
        vine.object({
          id: vine.number().optional(),
          name: vine.string().trim().maxLength(255),
          tableNumber: vine.string().trim().optional(),
        })
      ),
    })

    let payload
    try {
      payload = await vine.validate({ schema: updateGuestSchema, data: request.all() })
    } catch (error) {
      const messages = error instanceof Error ? (error as any).messages : error
      console.log('Error processing updating guest: ', messages)
      return response.status(422).send({ error: messages })
    }

    if (payload.isAttending && payload.noOfGuestsAttending > payload.maxGuests) {
      return response.status(422).send({ error: 'Number of guests attending exceeds max allowed.' })
    }

    const family = await FamilyInvitation.query().where('id', payload.id).preload('guests').first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found.' })
    }

    try {
      await db.transaction(async (trx) => {
        // Update family info
        await family
          .merge({
            familyName: payload.familyName,
            maxGuests: payload.maxGuests,
            isAttending:
              payload.isAttending === null || payload.isAttending === undefined
                ? null
                : payload.isAttending
                  ? 1
                  : 0,
            noOfGuestsAttending: payload.isAttending ? payload.noOfGuestsAttending : 0,
            updatedAt: new Date() as any,
          })
          .useTransaction(trx)
          .save()

        // Get IDs of guests in the payload
        const payloadGuestIds = payload.guests
          .map((guest) => guest.id)
          .filter((id) => id !== undefined)

        // Delete guests that are in the DB but not in the payload
        await family
          .related('guests')
          .query()
          .useTransaction(trx)
          .whereNotIn('id', payloadGuestIds.length ? payloadGuestIds : [0]) // [0] prevents SQL error if empty
          .delete()

        // Upsert guests
        for (const guest of payload.guests) {
          if (guest.id) {
            // Update existing guest
            await family
              .related('guests')
              .query()
              .useTransaction(trx)
              .where('id', guest.id)
              .update({
                name: guest.name,
                tableNumber: guest.tableNumber ?? null,
                updatedAt: new Date() as any,
              })
          } else {
            // Create new guest
            await family.related('guests').create(
              {
                name: guest.name,
                tableNumber: guest.tableNumber ?? null,
              },
              { client: trx }
            )
          }
        }
      })

      return response.status(200).send({ message: 'Family and guests updated successfully!' })
    } catch (error) {
      const msg = error instanceof Error ? (error as any).messages : error
      console.log('Error processing updating guest: ', msg)
      return response.status(500).send({ error: 'Failed to update family and guests.' })
    }
  }

  async deleteGuest({ request, response }: HttpContext) {
    const { id } = request.only(['id'])

    const family = await FamilyInvitation.query().where('id', id).preload('guests').first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found' })
    }

    try {
      // Start a transaction
      await db.transaction(async (trx) => {
        // Delete invitation keys related to guests
        await InvitationKey.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .delete()

        // Delete related guests
        await FamilyInvitationGuest.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .delete()

        // Delete the family
        await family.useTransaction(trx).delete()
      })

      return response.status(200).send({ message: 'Family and related data deleted successfully!' })
    } catch (error) {
      console.log('Error processing deleting guest: ', error instanceof Error ? error.message : error)
      return response.status(500).send({ error: 'Failed to delete family.' })
    }
  }

  async generateInviteKey({ params, response }: HttpContext) {
    const family = await FamilyInvitation.query().where('id', params.id).first()

    if (!family) {
      return response.status(404).send({ error: 'Family not found.' })
    }

    try {
      // Check if a valid invite key already exists
      const existingKey = await InvitationKey.query()
        .where('familyInvitationId', family.id)
        .andWhere('validUntil', '>', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
        .first()

      if (existingKey) {
        // Return the existing valid key
        return response.status(200).send({
          code: existingKey.code,
          inviteLink: `${process.env.APP_URL}/rsvp?key=${existingKey.code}`,
        })
      }

      // Generate a new invitation key if no valid key exists
      const newKey = await db.transaction(async (trx) => {
        // Invalidate any expired keys
        await InvitationKey.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .update({ validUntil: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') })

        // Create a new key
        return await InvitationKey.create(
          {
            code: shortuuid.generate(), // Generate a unique key
            familyInvitationId: family.id, // Associate the key with the family
            validUntil: DateTime.now().plus({ days: 35 }), // Set expiration date
          },
          { client: trx }
        )
      })

      return response.status(201).send({
        code: newKey.code,
        inviteLink: `${process.env.APP_URL}/rsvp?key=${newKey.code}`,
      })
    } catch (error) {
      console.log('Error processing generating invitation: ', error instanceof Error ? error.message : error)
      return response.status(500).send({ error: 'Failed to generate invite key.' })
    }
  }

  async generateAllInviteKeys({ response }: HttpContext) {
    try {
      const families = await FamilyInvitation.query()

      const qrCodes = await db.transaction(async (trx) => {
        const results = []

        for (const family of families) {
          // Check if a valid invite key exists
          const existingKey = await InvitationKey.query()
            .where('familyInvitationId', family.id)
            .andWhere('validUntil', '>', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
            .first()

          if (existingKey) {
            results.push({
              familyId: family.id,
              familyName: family.familyName,
              inviteKey: existingKey.code,
            })
          } else {
            // Generate a new invite key
            const newKey = await InvitationKey.create(
              {
                code: shortuuid.generate(),
                familyInvitationId: family.id,
                validUntil: DateTime.now().plus({ days: 33 }),
              },
              { client: trx }
            )

            results.push({
              familyId: family.id,
              familyName: family.familyName,
              inviteKey: newKey.code,
            })
          }
        }

        return results
      })

      return response.status(200).send(qrCodes)
    } catch (error) {
      console.log('Error processing generating all invitations: ', error instanceof Error ? error.message : error)
      return response.status(500).send({ error: 'Failed to generate invite keys.' })
    }
  }

  async getAuditLogs({ params, response }: HttpContext) {
    const familyId = params.id

    if (!familyId) {
      return response.status(400).send({ error: 'Family ID is required' })
    }

    try {
      // Use the provided SQL query to get audit logs
      const logs = await db.rawQuery(
        `
        SELECT al.id, fi.family_name, al.ip_address, al.user_agent, al.request_url, al.request_body, al.created_at 
        FROM audit_logs as al
        INNER JOIN invitation_keys as ik ON al.request_body LIKE CONCAT('%', ik.code, '%')
        INNER JOIN family_invitations as fi ON ik.family_invitation_id = fi.id
        WHERE fi.id = ? ORDER BY al.created_at DESC
      `,
        [familyId]
      )

      return response.status(200).send(logs[0])
    } catch (error) {
      console.log('Error fetching audit logs:', error instanceof Error ? error.message : error)
      return response.status(500).send({ error: 'Failed to fetch audit logs' })
    }
  }
}
