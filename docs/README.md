# TMUZIK

Our company wants to develop an application to bring an amazing music experience. This app help users can listen to music anytime and anywhere. “The true beauty of music is that it connects people. It carries a message, and we, the musicians, are the messengers,” said Roy Ayers, a prominent funk, soul and jazz composer.

## User Stories

### Authentication

- [] As a user, I want to be able to register for a new account with name, email and password. (gửi code về mail)
- [] As a user, I want to be able to log in (log out) of my account.
- [] As a user, I want to be able to stay signed in after refreshing the page.

### Songs

- [] As a user, I want to be able to see a list of songs.
- [] As a user, I want to be able to search for songs.

### Artists

- [] As a user, I want to be able to see a list of artists.
- [] As a user, I want to be able to search for artists.

### Reactions

- [] As a user, I want to be able to interact with song by liking or disliking.

### Lyrics

- [] As a user, I want to be able to see lyric of each song

### Playlists

- [] As a user, I want to be able to listen available

### Update Profile

- [] As a user, I want to be able to manage my profile by adding profile picture

## Endpoint APIs

### Auth APIs

```javascript
/**
 * @route POST auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 * /
```

### User APIs

```javascript
/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
 * /
```

```javascript
/**
 * @route GET /users/me
 * @description Get current users info
 * @access Login required
 * /
```

```javascript
/**
 * @route PUT /users/:id
 * @description Update user profile
 * @body {name, avatarUrl}
 * @access Login required
 * /
```

```javascript
/**
 *@route GET /users/:id
 * @description Get a user profile
 * @access Login required
 * /
```

### Song APIs

```javascript
/**
 *@route GET /songs?page=1&limit=10
 * @description Get all song can see with pagination
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /songs/:id
 * @description Get single artist
 * @access Login required
 */
```

### Chart APIs

```javascript
/**
 *@route GET /top-chart?page=1&limit=10
 * @description Get all top song can see with pagination
 * @access Login required
 */
```

### Artist APIs

```javascript
/**
 * @route GET /artists?page=1&limit=10
 * @description Get all artist can see with pagination
 * @access Login required
 * /
```

```javascript
/**
 *@route GET /artists/:id/songs?page=1&limit=10
 * @description Get all song of one artist user can see with pagination
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /artists/:id
 * @description Get single artist
 * @access Login required
 */
```

### Lyric APIs

```javascript
/**
 * @route GET /lyric/songs/:songId
 * @description Get lyric for a song
 * @access Login required
 * /
```

### Reaction APIs

```javascript
/**
 * @route POST /reactions
 * @description Save a reaction to song
 * @body {targetId, emoji: "like", "dislike"}
 * @access Login required
 * /
```

### Playlist APIs

```javascript
/**
 * @route POST /playlists
 * @description Create new playlist
 * @body {name, songId, author}
 * @access Login required
 * /
```

```javascript
/**
 * @route GET /playlists/:id
 * @description Get a single playlist
 * @access Login required
 */
```

```javascript
/**
 * @route GET /playlists
 * @description Get playlists
 * @access Login required
 */
```
