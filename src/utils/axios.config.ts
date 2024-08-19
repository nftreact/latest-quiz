import { THISPROJECT } from '@/constants/projects';
import axios from 'axios';

export const ApiManager = axios.create({
  baseURL: THISPROJECT.SERVER,
  headers: {
    accept: 'application/json',
  },
});
