var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import cron from 'cron';
import fetch from 'node-fetch';
// Scheduled Service Call: ingest new stories from HN (default: every minute)
export default new cron.CronJob(process.env.SOURCE_HN_STORY_ACTIVITY_CRON_TIME || '* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startTime = Date.now();
        console.info(`[INFO:StoryActivity] starting scheduled service call for ingesting story activity from HN`);
        const requestUrl = `${process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://www.meatballs.live'}/api/services/ingest/story-activity?dataSource=hn`;
        const response = yield fetch(requestUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.INGEST_API_KEY}`
            }
        }), { totalStoriesUpdatedWithLatestScore, totalStoriesUpdatedWithLatestCommentTotal } = (yield response.json()).data, msToComplete = Date.now() - startTime;
        // TODO: post msToComplete to _status service
        console.info(`[INFO:StoryActivity] completed scheduled service call for ingesting story activity from HN in ${msToComplete}ms...`);
        console.info(`[INFO:StoryActivity] ...successfully updating ${totalStoriesUpdatedWithLatestScore} story scores and ${totalStoriesUpdatedWithLatestCommentTotal} story comment totals`);
    }
    catch (error) {
        console.error(`[ERROR:StoryActivity] ${error.message}`);
    }
}), null, false, 'America/Chicago', null);
