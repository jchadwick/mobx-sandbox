import speakers from "./stubData/speakers";

export class SpeakersService {

    private speakers: Api.Speaker[];

    constructor() {
        this.speakers = speakers;
    }

    getAllSpeakers() {
        return this.speakers;
    }

}

export default new SpeakersService();