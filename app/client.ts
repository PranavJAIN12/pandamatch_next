
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwthhallvxgbvwgvzazk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dGhoYWxsdnhnYnZ3Z3Z6YXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTI2MjEsImV4cCI6MjA0NzMyODYyMX0.Ch_CKERms0fGK0K2X0rOGYGOMFLOOOpR_BGW_xLCExI"
export const supabase = createClient(supabaseUrl, supabaseKey)