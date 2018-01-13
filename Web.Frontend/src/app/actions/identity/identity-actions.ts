import { IdentityDto } from "../../stores/identity/identity-store";

export namespace IdentityActions {
    export class UserLoggedIn {
        constructor(private identity: IdentityDto) { }

        public get Identity(): IdentityDto {
            return this.identity;
        }
    }

    export class UserLoggedOut { }
}
