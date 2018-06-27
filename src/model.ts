import { observable, IObservableArray, computed, action } from "mobx";
import { ILazyObservable } from "mobx-utils";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Complicated = "Complicated",
  Undisclosed = "Undisclosed"
}

export class Location {
  private id?: number;
}

export class Session {
  private id?: number;

  private locationThunk: ILazyObservable<Location>;
  private speakerThunk: ILazyObservable<Speaker>;
  private timeSlotThunk: ILazyObservable<TimeSlot>;

  speakerId: number;

  @observable key?: string;
  @observable type: "Presentation" | "Keynote" | "Break" | "Reserved";
  @observable title: string;
  @observable description: string;
  @observable length: SessionLength;
  @observable year?: number;
  @observable attendeeCount?: number;

  @computed
  get location(): Location {
    return this.locationThunk.current();
  }

  @computed
  get speaker(): Speaker {
    return this.speakerThunk.current();
  }

  @computed
  get timeSlot(): TimeSlot {
    return this.timeSlotThunk.current();
  }

  constructor(source?: any) {
    Object.assign(this, source);
  }
}

export enum SessionLength {
  "Short" = "Short",
  "Medium" = "Medium",
  "Long" = "Long",
  "Lightning" = "Lightning"
}

export class Speaker {
  private sessionsThunk?: ILazyObservable<Session[]>;
  private submissionsThunk?: ILazyObservable<Submission[]>;
  private userThunk?: ILazyObservable<User>;

  private id: number;

  @observable key: string;
  @observable gender: Gender;
  @observable name: string;
  @observable biography?: string;
  @observable avatarUrl?: string;
  @observable city?: string;
  @observable state?: string;
  @observable country?: string;
  @observable company?: string;

  @computed
  get sessions(): Session[] {
    return this.sessionsThunk.current();
  }

  @computed
  get submissions(): Submission[] {
    return this.submissionsThunk.current();
  }

  @computed
  get userDisplayName() {
    return this.userThunk.current().displayName;
  }

  constructor(
    source?: any,
    sessionsThunk?: ILazyObservable<Session[]>,
    submissionsThunk?: ILazyObservable<Submission[]>,
    userThunk?: ILazyObservable<User>
  ) {
    Object.assign(this, source);
    this.sessionsThunk = sessionsThunk;
    this.submissionsThunk = submissionsThunk;
    this.userThunk = userThunk;
  }
}

export enum SpeakerStatus {
  Confirmed = "Confirmed",
  Accepted = "Accepted",
  Alternate = "Alternate",
  Rejected = "Rejected",
  Selected = "Selected",
  Submitted = "Submitted",
  Withdrawn = "Withdrawn"
}

export class Submission {
  private speakerThunk: ILazyObservable<Speaker>;
  private sessionThunk: ILazyObservable<Session>;

  @observable private id?: number;
  @observable submitDate?: string;
  @observable length: SessionLength;
  @observable status?: SubmissionStatus;
  @observable title: string;
  @observable description: string;
  @observable year?: number;

  get session(): Session {
    return this.sessionThunk.current();
  }

  get speaker(): Speaker {
    return this.speakerThunk.current();
  }
}

export enum SubmissionStatus {
  Accepted = "Accepted",
  Alternate = "Alternate",
  Rejected = "Rejected",
  Selected = "Selected",
  Submitted = "Submitted",
  Withdrawn = "Withdrawn"
}

export class TimeSlot {
  private id?: number;
}

export class User {
  id: string;
  @observable firstName: string;
  @observable lastName: string;

  @computed
  get displayName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const sortByDateAsc = (a, b) =>
  new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf();
