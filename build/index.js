import 'dotenv/config';
import { callServiceIngestNewStoriesFromHNJob, callServiceIngestStoryActivityFromHNJob } from './jobs';
console.info(`[INFO] ENVIRONMENT: ${process.env.NODE_ENV}`);
callServiceIngestNewStoriesFromHNJob.start();
console.info(`[INFO:NewStories] started call service job for ingesting new stories from source HN : ${process.env.SOURCE_HN_NEW_STORIES_CRON_TIME}`);
callServiceIngestStoryActivityFromHNJob.start();
console.info(`[INFO:StoryActivity] started call service job for ingesting story activity from source HN : ${process.env.SOURCE_HN_STORY_ACTIVITY_CRON_TIME}`);
