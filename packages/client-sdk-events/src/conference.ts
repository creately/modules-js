export enum ConferenceEvents {
  /**
   * When the connection is ready to start the room
   */
  conferenceConnectionSuccess = 'creately:conference:connnectionSuccess',

  /**
   * When the conference starts
   */
  conferenceStarted = 'creately:conference:started',

  /**
   * When there is an error in the conference
   */
  conferenceError = 'creately:conference:error',

  /**
   * When you are disconnected
   */
  conferenceDisconected = 'creately:conference:disconnected',

  /**
   * When another user joins or leaves the conference
   */
  conferenceUserListChanged = 'creately:conference:userListChanged',
}

export enum ConferenceCommands {
  /**
   * Fired when requesting the conference to start
   * data: { token: <jitsiJWTToken>, room: <roomName(documentId)> }
   */
  conferenceStart = 'creately:conference:start',

  /**
   * Fired to leave the conference
   */
  conferenceStop = 'creately:conference:stop',

  /**
   * Fired to mute own audio
   */
  conferenceMuteAudio = 'creately:conference:muteAudio',

  /**
   * Fired to mute video
   */
  conferenceMuteVideo = 'creately:conference:muteVideo',

  /**
   * Fired to request focus for the sender
   */
  conferenceRequestFocus = 'creately:conference:requestFocus',
}
