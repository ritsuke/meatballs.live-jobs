import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

interface IngestRequestResponse {
  data: {
    totalStoriesUpdatedWithLatestScore: number
    totalStoriesUpdatedWithLatestCommentTotal: number
  }
}

// Scheduled Service Call: ingest new stories from HN (default: every minute)
export default new cron.CronJob(
  process.env.SOURCE_HN_STORY_ACTIVITY_CRON_TIME || '* * * * *',
  async () => {
    try {
      const startTime = Date.now()

      console.info(
        `[INFO:StoryActivity] starting scheduled service call for ingesting story activity from HN`
      )

      const requestUrl = `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.meatballs.live'
      }/api/services/ingest/story-activity?dataSource=hn`

      const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.INGEST_API_KEY}`
          }
        }),
        {
          totalStoriesUpdatedWithLatestScore,
          totalStoriesUpdatedWithLatestCommentTotal
        } = ((await response.json()) as IngestRequestResponse).data,
        msToComplete = Date.now() - startTime

      // TODO: post msToComplete to _status service

      console.info(
        `[INFO:StoryActivity] completed scheduled service call for ingesting story activity from HN in ${msToComplete}ms...`
      )
      console.info(
        `[INFO:StoryActivity] ...successfully updating ${totalStoriesUpdatedWithLatestScore} story scores and ${totalStoriesUpdatedWithLatestCommentTotal} story comment totals`
      )
    } catch (error) {
      console.error(`[ERROR:StoryActivity] ${(error as Error).message}`)
    }
  },
  null,
  true,
  'America/Chicago',
  null
)
