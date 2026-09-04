import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'rsvps.get_guest_invitation': { paramsTuple?: []; params?: {} }
    'rsvps.save_guest_invitation': { paramsTuple?: []; params?: {} }
    'seat_inquiries.fetch_guests': { paramsTuple?: []; params?: {} }
    'guests.get_guest_list': { paramsTuple?: []; params?: {} }
    'guests.get_total_kids_below_7': { paramsTuple?: []; params?: {} }
    'guests.get_guest_by_id': { paramsTuple?: []; params?: {} }
    'guests.create_guest': { paramsTuple?: []; params?: {} }
    'guests.update_guest': { paramsTuple?: []; params?: {} }
    'guests.delete_guest': { paramsTuple?: []; params?: {} }
    'guests.generate_invite_key': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'guests.generate_all_invite_keys': { paramsTuple?: []; params?: {} }
    'guests.get_audit_logs': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'login.login': { paramsTuple?: []; params?: {} }
    'statistics.get_statistics': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'rsvps.get_guest_invitation': { paramsTuple?: []; params?: {} }
    'seat_inquiries.fetch_guests': { paramsTuple?: []; params?: {} }
    'guests.get_guest_list': { paramsTuple?: []; params?: {} }
    'guests.get_total_kids_below_7': { paramsTuple?: []; params?: {} }
    'guests.get_guest_by_id': { paramsTuple?: []; params?: {} }
    'guests.get_audit_logs': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'statistics.get_statistics': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'rsvps.get_guest_invitation': { paramsTuple?: []; params?: {} }
    'seat_inquiries.fetch_guests': { paramsTuple?: []; params?: {} }
    'guests.get_guest_list': { paramsTuple?: []; params?: {} }
    'guests.get_total_kids_below_7': { paramsTuple?: []; params?: {} }
    'guests.get_guest_by_id': { paramsTuple?: []; params?: {} }
    'guests.get_audit_logs': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'statistics.get_statistics': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'rsvps.save_guest_invitation': { paramsTuple?: []; params?: {} }
    'guests.create_guest': { paramsTuple?: []; params?: {} }
    'guests.generate_invite_key': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'guests.generate_all_invite_keys': { paramsTuple?: []; params?: {} }
    'login.login': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'guests.update_guest': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'guests.delete_guest': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}