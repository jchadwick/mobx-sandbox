declare namespace Api {
    export interface BulkEmailMessage {
        recipients?: string[];
        subject?: string;
        body?: string;
        replyTo?: string;
    }
    export interface Evaluation {
        id?: number; // int64
        timestamp?: string; // date-time
        year?: number; // int32
        userId?: string;
        sessionId?: number; // int64
        responses?: {
        };
    }
    export interface EvaluationSummary {
        sessionId?: number; // int64
        sessionKey?: string;
        sessionTitle?: string;
        speakerId?: number; // int64
        speakerKey?: string;
        speakerName?: string;
        count?: number; // int32
        rating?: number; // double
    }
    export interface EvaluationSummaryViewModel {
        readonly overall?: number; // float
        readonly presentation?: number; // float
        readonly content?: number; // float
        readonly knowledge?: number; // float
        readonly comments?: string[];
        sessions?: SessionEvaluationSummary[];
        speakers?: SpeakerEvaluationSummary[];
        evaluations?: Evaluation[];
    }
    export interface Location {
        id?: number; // int64
        ordinal?: number; // int32
        name?: string;
        year?: number; // int32
    }
    export interface LocationSessionViewModel {
        readonly time?: string;
        startTime?: string; // date-time
        title?: string;
        speaker?: string;
    }
    export interface LocationSessionsViewModel {
        location?: string;
        day?: string;
        sessions?: LocationSessionViewModel[];
    }
    export interface QuickSubmission {
        speakerKey?: string;
        speakerName?: string;
        bio?: string;
        title?: string;
        description?: string;
        year?: number; // int32
        readonly isNewSpeaker?: boolean;
    }
    export interface ScheduleSubmissionRequest {
        submissionId?: number; // int64
        timeSlotId?: number; // int64
        locationId?: number; // int64
    }
    export interface Session {
        id?: number; // int64
        key?: string;
        type?: "Presentation" | "Keynote" | "Break" | "Reserved";
        title: string;
        description: string;
        length: "Short" | "Medium" | "Long" | "Lightning";
        categoryId: number; // int64
        speakerId: number; // int64
        timeSlotId?: number; // int64
        year?: number; // int32
        locationId?: number; // int64
        attendeeCount?: number; // int64
        readonly displayName?: string;
    }
    export interface SessionEvaluationSummary {
        sessionKey?: string;
        readonly sessionTitle?: string;
        readonly overall?: number; // float
        readonly presentation?: number; // float
        readonly content?: number; // float
        readonly knowledge?: number; // float
        readonly comments?: string[];
        sessions?: SessionEvaluationSummary[];
        speakers?: SpeakerEvaluationSummary[];
        evaluations?: Evaluation[];
    }
    export interface Speaker {
        id?: number; // int64
        key?: string;
        userId?: string;
        gender?: "Undisclosed" | "Male" | "Female" | "Complicated";
        name?: string;
        biography?: string;
        avatarUrl?: string;
        city?: string;
        state?: string;
        country?: string;
        company?: string;
    }
    export interface SpeakerEvaluationSummary {
        speakerKey?: string;
        speakerName?: string;
        readonly overall?: number; // float
        readonly presentation?: number; // float
        readonly content?: number; // float
        readonly knowledge?: number; // float
        readonly comments?: string[];
        sessions?: SessionEvaluationSummary[];
        speakers?: SpeakerEvaluationSummary[];
        evaluations?: Evaluation[];
    }
    export interface Submission {
        id?: number; // int64
        submitDate?: string; // date-time
        accepted?: boolean;
        speakerId?: number; // int64
        sessionId?: number; // int64
        length: "Short" | "Medium" | "Long" | "Lightning";
        status?: "Submitted" | "Selected" | "Alternate" | "Rejected" | "Accepted" | "Withdrawn";
        categoryId: number; // int64
        title: string;
        description: string;
        year?: number; // int32
    }
    export interface TimeSlot {
        id?: number; // int64
        startTime?: string; // date-time
        length?: "Short" | "Medium" | "Long" | "Lightning";
        year?: number; // int32
        readonly date?: string; // date-time
        readonly duration?: string;
    }
    export interface UserInfo {
        key?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        readonly name?: string;
        gender?: "Undisclosed" | "Male" | "Female" | "Complicated";
        avatarUrl?: string;
        roles?: string[];
    }
}
