export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _expiringToken:Date){}
    get token(){
        if(!this._expiringToken||new Date() > this._expiringToken){
            return null
        }else {
            return this._token
        }
    }
}