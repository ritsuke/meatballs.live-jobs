import 'dotenv/config'

import {
  callServiceIngestNewStoriesFromHNJob,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_0,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_1,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_2,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_3,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_4,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_5,
  callServiceIngestStoryActivityFromHNJob as callServiceIngestStoryActivityFromHNJob_6
} from './jobs'

console.info(`[INFO] ENVIRONMENT: ${process.env.NODE_ENV}`)

// TODO: manage without restart e.g. poll service, webhook, etc.
if (process.env.SOURCE_HN_NEW_STORIES_PAUSED !== 'true') {
  callServiceIngestNewStoriesFromHNJob.start()

  console.info(
    `[INFO:NewStories] started call service job for ingesting new stories from source HN : ${process.env.SOURCE_HN_NEW_STORIES_CRON_TIME}`
  )
}

if (process.env.SOURCE_HN_NEW_STORIES_PAUSED === 'true') {
  console.warn(
    `[WARN:NewStories] call service job for ingesting new stories from source HN is paused`
  )
}

if (process.env.SOURCE_HN_STORY_ACTIVITY_PAUSED !== 'true') {
  const commentWeight = process.env.SOURCE_HN_STORY_ACTIVITY_COMMENT_WEIGHT
      ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_COMMENT_WEIGHT)
      : undefined,
    falloff = process.env.SOURCE_HN_STORY_ACTIVITY_FALLOFF
      ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_FALLOFF)
      : undefined

  // 0-1 hour old
  callServiceIngestStoryActivityFromHNJob_0({
    name: '0',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_0_CRON_TIME,
    range: {
      start: 0,
      end: 1
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_0_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_0_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_0_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_0_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 1-4 hours old
  callServiceIngestStoryActivityFromHNJob_1({
    name: '1',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_1_CRON_TIME,
    range: {
      start: 1,
      end: 4
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_1_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_1_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_1_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_1_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 4-8 hours old
  callServiceIngestStoryActivityFromHNJob_2({
    name: '2',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_2_CRON_TIME,
    range: {
      start: 4,
      end: 8
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_2_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_2_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_2_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_2_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 8-16 hours old
  callServiceIngestStoryActivityFromHNJob_3({
    name: '3',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_3_CRON_TIME,
    range: {
      start: 8,
      end: 16
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_3_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_3_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_3_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_3_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 16-24 hours old
  callServiceIngestStoryActivityFromHNJob_4({
    name: '4',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_4_CRON_TIME,
    range: {
      start: 16,
      end: 24
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_4_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_4_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_4_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_4_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 24-36 hours old
  callServiceIngestStoryActivityFromHNJob_5({
    name: '5',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_5_CRON_TIME,
    range: {
      start: 24,
      end: 36
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_5_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_5_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_5_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_5_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()

  // 36-48 hours old
  callServiceIngestStoryActivityFromHNJob_6({
    name: '6',
    cronTime: process.env.SOURCE_HN_STORY_ACTIVITY_6_CRON_TIME,
    range: {
      start: 36,
      end: 48
    },
    gate: {
      score: process.env.SOURCE_HN_STORY_ACTIVITY_6_GATE_SCORE
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_6_GATE_SCORE)
        : undefined,
      commentTotal: process.env.SOURCE_HN_STORY_ACTIVITY_6_GATE_COMMENT_TOTAL
        ? parseInt(process.env.SOURCE_HN_STORY_ACTIVITY_6_GATE_COMMENT_TOTAL)
        : undefined
    },
    commentWeight,
    falloff
  }).start()
}

if (process.env.SOURCE_HN_STORY_ACTIVITY_PAUSED === 'true') {
  console.warn(
    `[WARN:StoryActivity] call service job for ingesting story activity from source HN is paused`
  )
}
