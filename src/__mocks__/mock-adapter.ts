import MockAdapter from 'axios-mock-adapter'
import { httpClient } from 'config'

export const mockAdapter = new MockAdapter(httpClient)
