# meatballs.live-jobs (JOBS SERVER; casper)

## How to run it locally

### Prerequisites

- [Git](https://git-scm.com/downloads) 2.37.2
- [Node](https://nodejs.org/download/release/v16.5.0/) 16.50.0
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) 1.22.19

Assuming that you've arrived here from the [meatballs.live (APP) local installation guide](https://github.com/ritsuke/meatballs.live/blob/main/README.md)...

### Local installation

1. Clone this repo
2. Run `yarn` in the project folder to install dependencies
3. Copy `.env.sample` to `.env` and fill in your unique values, following the steps below:

`INGEST_API_KEY`

1. [Generate](https://codepen.io/corenominal/pen/rxOmMJ) an API key and copy and paste to your `.env` file; this can be anything, but should remain private

Next, copy and replace the remaining with the following (feel free to tweak):

```
SOURCE_HN_NEW_STORIES_CRON_TIME=*/5 * * * * *
SOURCE_HN_NEW_STORIES_PAUSED=false
SOURCE_HN_NEW_STORIES_LIMIT=10

SOURCE_HN_STORY_ACTIVITY_0_CRON_TIME=3-59/5 * * * * *
SOURCE_HN_STORY_ACTIVITY_0_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_0_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_1_CRON_TIME=5-59/29 * * * * *
SOURCE_HN_STORY_ACTIVITY_1_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_1_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_2_CRON_TIME=7 */2 * * * *
SOURCE_HN_STORY_ACTIVITY_2_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_2_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_3_CRON_TIME=23 */7 * * * *
SOURCE_HN_STORY_ACTIVITY_3_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_3_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_4_CRON_TIME=29 */13 * * * *
SOURCE_HN_STORY_ACTIVITY_4_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_4_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_5_CRON_TIME=31 23 */12 * * *
SOURCE_HN_STORY_ACTIVITY_5_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_5_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_6_CRON_TIME=37 37 0 * * *
SOURCE_HN_STORY_ACTIVITY_6_GATE_SCORE=
SOURCE_HN_STORY_ACTIVITY_6_GATE_COMMENT_TOTAL=

SOURCE_HN_STORY_ACTIVITY_COMMENT_WEIGHT=4
SOURCE_HN_STORY_ACTIVITY_FALLOFF=20
SOURCE_HN_STORY_ACTIVITY_PAUSED=false
```

### Continue meatballs.live (APP) installation

Unless you've finished local installation of the APP and the APP's development server is running, it is not recommended to start the JOBS (this) development server (`yarn dev`), as requests to the APP's API will fail.

Copy the `INGEST_API_KEY` value from your `.env` file and continue with the [APP's local installation guide](https://github.com/ritsuke/meatballs.live/blob/main/README.md).

## Deployment

Though meatballs uses [Railway](https://railway.app) to automatically deploy the JOBS SERVER (casper), you can run the server on any host that is node.js-capable.
