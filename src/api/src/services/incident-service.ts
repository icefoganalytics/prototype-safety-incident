import { Incident } from "src/data/models";

import { sqldb } from "../data";

export class IncidentService {
  getAll(query?: any): Promise<Incident[]> {
    return sqldb("incident").where(query || {});
  }

  get(id: number): Promise<Incident | undefined> {
    return sqldb("incident").where({ id }).first();
  }

  update(id: number, centre: Incident) {
    return sqldb("incident").where({ id }).update(cleanForUpdate(centre));
  }

  create(centre: Incident) {
    return sqldb("incident").insert(cleanForUpdate(centre));
  }

  delete(id: number) {
    sqldb("incident").where({ incident_id: id }).delete();
    return sqldb("incident").where({ id }).delete();
  }
}

function cleanForUpdate(i: any) {
  return {
    name: i.name,
    community: i.community,
    region: i.region,
    is_active: i.is_active,
  };
}
