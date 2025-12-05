// TypeScript type definitions matching backend models
// Using const objects instead of enums for TypeScript compatibility

export const IssueStatus = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED'
} as const;

export type IssueStatus = typeof IssueStatus[keyof typeof IssueStatus];

export const Priority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
} as const;

export type Priority = typeof Priority[keyof typeof Priority];

export const UserRole = {
    USER: 'USER',
    ADMIN: 'ADMIN'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface City {
    id: number;
    name: string;
}

export interface Zone {
    id: number;
    name: string;
    cityId: number;
}

export interface Area {
    id: number;
    name: string;
    zoneId: number;
}

export interface Issue {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: Priority;
    status: IssueStatus;
    upvotes: number;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
}

export interface IssueWithDetails extends Issue {
    user?: User;
    city?: City;
    zone?: Zone;
    area?: Area;
}

export interface Upvote {
    id: number;
    userId: number;
    issueId: number;
    createdAt: string;
}

export interface IssueStats {
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
}

export interface CreateIssueRequest {
    title: string;
    description: string;
    category: string;
    priority: Priority;
    status?: IssueStatus;
}
