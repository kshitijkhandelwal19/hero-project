export class Hero{
    constructor(
        public Id:string,
        public Name:string,
        public Power:string,
        public AlterEgo?:string,
        public State:string = 'inactive'
    ){
        
    }

    toggleState() {
        this.State = this.State === 'active' ? 'inactive' : 'active';
    }
}