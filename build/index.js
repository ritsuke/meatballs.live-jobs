import 'dotenv/config';
import { callServiceIngestNewStoriesFromHNJob, callServiceIngestStoryActivityFromHNJob } from './jobs';
console.info(`[INFO] ENVIRONMENT: ${process.env.NODE_ENV}`);
// TODO: manage without restart e.g. poll service, webhook, etc.
if (process.env.SOURCE_HN_NEW_STORIES_PAUSED !== 'true') {
    callServiceIngestNewStoriesFromHNJob.start();
    console.info(`[INFO:NewStories] started call service job for ingesting new stories from source HN : ${process.env.SOURCE_HN_NEW_STORIES_CRON_TIME}`);
}
if (process.env.SOURCE_HN_NEW_STORIES_PAUSED === 'true') {
    console.info(`[WARN:NewStories] call service job for ingesting new stories from source HN is paused`);
}
if (process.env.SOURCE_HN_STORY_ACTIVITY_PAUSED !== 'true') {
    callServiceIngestStoryActivityFromHNJob.start();
    console.info(`[INFO:StoryActivity] started call service job for ingesting story activity from source HN : ${process.env.SOURCE_HN_STORY_ACTIVITY_CRON_TIME}`);
}
if (process.env.SOURCE_HN_STORY_ACTIVITY_PAUSED === 'true') {
    console.info(`[WARN:StoryActivity] call service job for ingesting story activity from source HN is paused`);
}
