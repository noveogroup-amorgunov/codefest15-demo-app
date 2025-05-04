import type { diContainer } from '../di/useDi'
import type { AppDispatch, RootState } from './reduxStore'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: typeof diContainer
}>()
