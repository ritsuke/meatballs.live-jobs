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
export default ({
  name,
  cronTime,
  range,
  gate,
  commentWeight,
  falloff
}: {
  name: string
  cronTime?: string
  range?: {
    start?: number
    end?: number
  }
  gate?: {
    score?: number
    commentTotal?: number
  }
  commentWeight?: number
  falloff?: number
}) => {
  const cronJob = new cron.CronJob(
    cronTime || '* * * * *',
    async () => {
      try {
        const startTime = Date.now()

        console.info(
          `[INFO:StoryActivity:${name}] starting scheduled service call for ingesting story activity from HN`
        )

        let queryString = `?dataSource=hn`

        if (range?.start !== undefined) {
          queryString += `&start=${range.start}`
        }

        if (range?.end !== undefined) {
          queryString += `&end=${range.end}`
        }

        if (gate?.score !== undefined) {
          queryString += `&score=${gate.score}`
        }

        if (gate?.commentTotal !== undefined) {
          queryString += `&commentTotal=${gate.commentTotal}`
        }

        if (commentWeight !== undefined) {
          queryString += `&commentWeight=${commentWeight}`
        }

        if (falloff !== undefined) {
          queryString += `&falloff=${falloff}`
        }

        console.info(queryString)

        const requestUrl = `${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://www.meatballs.live'
        }/api/services/ingest/story-activity${queryString}`

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
          `[INFO:StoryActivity:${name}] completed scheduled service call for ingesting story activity from HN in ${msToComplete}ms...`
        )
        console.info(
          `[INFO:StoryActivity:${name}] ...successfully updating ${totalStoriesUpdatedWithLatestScore} story scores and ${totalStoriesUpdatedWithLatestCommentTotal} story comment totals`
        )
      } catch (error) {
        console.error(
          `[ERROR:StoryActivity:${name}] ${(error as Error).message}`
        )
      }
    },
    null,
    false,
    'America/Chicago',
    null
  )

  console.info(
    `[INFO:StoryActivity:${name}] started call service job for ingesting story activity from source HN : ${cronTime}`
  )

  return cronJob
}
