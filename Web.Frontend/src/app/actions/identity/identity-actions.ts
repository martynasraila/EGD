import { UserKind } from "../../stores/identity/identity-contracts";

export namespace IdentityActions {
    export class UserLoggedIn {
        constructor(private userId: string, private userKind: UserKind) { }

        public get UserId(): string {
            return this.userId;
        }

        public get UserKind(): UserKind {
            return this.userKind;
        }
    }

    export class UserLoggedOut { }
}
