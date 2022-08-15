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
export default new cron.CronJob(process.env.SOURCE_HN_NEW_STORIES_CRON_TIME || '* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startTime = Date.now();
        console.info(`[INFO:NewStories] starting scheduled service call for ingesting new stories from HN with max of ${process.env.SOURCE_HN_MAX_NEW_STORIES}`);
        const requestUrl = `${process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://www.meatballs.live'}/api/services/ingest/new-stories?dataSource=hn&max=${process.env.SOURCE_HN_MAX_NEW_STORIES}`;
        const response = yield fetch(requestUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.INGEST_API_KEY}`
            }
        }), { totalStoriesSaved } = (yield response.json()).data, msToComplete = Date.now() - startTime;
        // TODO: post msToComplete to _status service
        console.info(`[INFO:NewStories] completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms, saving ${totalStoriesSaved} new stories`);
    }
    catch (error) {
        console.error(`[ERROR:NewStories] ${error.message}`);
    }
}), null, true, 'America/Chicago', null);
