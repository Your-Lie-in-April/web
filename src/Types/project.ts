import { ScheduleWeekResponse } from './schedule';

export type ProjectEntity = {
    projcetId: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
    isStored: boolean;
    coverImageUrl: string;
    color: string;
};

export type ProjectThumbnailResponse = {
    projectId: number;
    title: string;
    description: string;
    color: string;
    coverImageUrl: string;
};

export type PinProjectResponse = {
    projcetId: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
    isStored: boolean;
    coverImageUrl: string;
    color: string;
    memberCount: number;
    schedule: ScheduleWeekResponse[];
};

export type ProjectResDto = ProjectEntity;
