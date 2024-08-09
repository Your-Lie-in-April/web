import { differenceInMinutes, format, isToday, isYesterday, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatTimeAgo = (dateString: string): string => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInMinutes = differenceInMinutes(now, date);

    if (diffInMinutes < 1) {
        return '지금';
    } else if (isToday(date)) {
        return format(date, 'a h시 mm분', { locale: ko });
    } else if (isYesterday(date)) {
        return '어제';
    } else {
        return format(date, 'yyyy-MM-dd');
    }
};
