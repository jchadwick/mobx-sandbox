import submissions from "./stubData/submissions";

export class SessionsService {
  private sessions: Api.Session[];

  constructor() {
    this.sessions = submissions.filter(x => x.sessionId != null).map(x => ({
      id: x.sessionId,
      key: x.title,
      title: x.title,
      description: x.description,
      categoryId: x.categoryId,
      speakerId: x.speakerId,
      year: x.year
    }));
  }

  getAllSessions() {
    return this.sessions;
  }

  getSessionsByYear(year: number) {
    return this.sessions.filter(x => x.year === year);
  }
}

export default new SessionsService();
