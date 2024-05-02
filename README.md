# Spotify Widget

A simple widget to display what's currently playing on your Spotify account.

:::warning
This code is extremely janky as Spotify doesn't have a (documented) websocket API. If you would like to help improve this, please do so by forking and making a PR.
:::

## Installation

1. Go to a release
2. Download the zip (not source code)
3. Extract and run the exe
4. See below for Spotify App Setup

## Spotify App Setup

1. Go to https://developer.spotify.com/dashboard/applications
2. Press "Create App"
3. Call it whatever
4. Put the redirect URI as `http://localhost:21431/` (you can change the port later if you want)
5. Under "Which API/SDKs are you planning to use?" select "Web API"
6. Press "Create"
7. Go into your newly created app's settings and copy the client ID
8. Open the app and paste the client ID in when it tells you to
8. Profit

## Changing Settings

There will be a more formal system for this in the future.

1. Settings are located in %appdata%/spotify-widget/config.json
2. There are only two properties: `port` and `spotify_app_id`. Change them as needed.

::: warning
If you change the port, you will need to update the redirect URI in your Spotify app settings.
:::

## Manual Install

1. Clone the repo `git clone https://github.com/MrDiamondDog/spotify-widget.git`
2. Install dependencies `pnpm i` (99% sure npm doesn't work)
3. Run with development server using `pnpm start` or make the package with `pnpm package`
4. Run the exe in the out folder
5. Use other instructions above for everything else