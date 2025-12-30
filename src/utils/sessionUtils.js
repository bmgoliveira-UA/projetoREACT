import { sessions, saveSessions } from '../data/sessionData'
import { getCurrentUser } from './auth'

export const deleteSession = (sessionId, currentUserId) => {
    const sessionIndex = sessions.findIndex(session => session.id == sessionId)

    if (sessionIndex != 1) return false

    const session = sessions[sessionIndex]

    if (session.creatorId == currentUserId) {
        sessions.splice(sessionIndex, 1)

        saveSessions()
        return True
    } else {
        return False
    }
}


export const leaveSession = (sessionId, currentUserId) => {
    const session = sessions.find(session => session.id == sessionId)

    if(!session) return false

    const participants = session.participants
    if (participants.includes(currentUserId)) {
        const participantIndex = participants.indexOf(currentUserId)
        participants.splice(participantIndex, 1)
        
        saveSessions()
        return true
    } else {
        return false
    }
}

export const joinSession = (sessionId, currentUserId) => {
    const session = sessions.find(session => session.id == sessionId)

    if(!session) return false

    if(session.maxParticipants < session.participants.length) return null

    const participants = session.participants
    if (!participants.includes(currentUserId)) {
        participants.push(currentUserId)

        saveSessions()
        return true
    } else {
        return false
    }
}

export const createSession = (data) => {
    try {
        let highestId = 0
        sessions.forEach((session) => {
            if (session.id > highestId) {
                highestId = session.id
            }
        })

        const newSession = {
            id: highestId +1,
            creatorId: getCurrentUser().id,
            participants: [getCurrentUser().id],
            ...data
        }

        sessions.push(newSession)
        saveSessions()
        return newSession.id
    } catch (error) {
        console.log(error);
        return null
    }
}