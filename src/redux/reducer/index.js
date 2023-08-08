import authReducer from './auth'
import filesReducer from './files'
import projectsReducer from './projects'


export const rootReducer = {
    authReducer: authReducer,
    projectsReducer: projectsReducer,
    filesReducer: filesReducer
}

