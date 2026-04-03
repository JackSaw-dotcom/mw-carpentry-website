// ============================================================
// SUPABASE CLIENT - Miller & Watson Contractor Portal
// ============================================================
// INSTRUCTIONS:
// 1. Go to supabase.com and create a free account
// 2. Create a new project
// 3. Go to Settings > API
// 4. Copy your Project URL and paste it below (replace YOUR_SUPABASE_URL)
// 5. Copy your anon/public key and paste it below (replace YOUR_SUPABASE_ANON_KEY)
// ============================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hwhpkgbjovqcigrwolsg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHBrZ2Jqb3ZxY2lncndvbHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTQ3ODMsImV4cCI6MjA5MDczMDc4M30.bIhN0-au6dAbRSODQHE2XzLuGiyfwtU60AvjL-O65nM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// DATABASE HELPER FUNCTIONS
// ============================================================

// --- AUTH (PIN-based login) ---
export async function loginWithPin(pin) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('pin', pin)
    .single();
  if (error || !data) return null;
  return data;
}

// --- WORK LOG ---
export async function fetchWorkLog() {
  const { data } = await supabase.from('work_log').select('*').order('id');
  return data || [];
}

export async function addWorkLogEntry(entry) {
  const { data, error } = await supabase.from('work_log').insert(entry).select().single();
  return { data, error };
}

export async function updateWorkLogEntry(id, updates) {
  const { data, error } = await supabase.from('work_log').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  return { data, error };
}

// --- ALLOCATIONS ---
export async function fetchAllocations() {
  const { data } = await supabase.from('allocations').select('*').order('start_date');
  return data || [];
}

export async function addAllocation(alloc) {
  const { data, error } = await supabase.from('allocations').insert(alloc).select().single();
  return { data, error };
}

export async function updateAllocation(id, updates) {
  const { data, error } = await supabase.from('allocations').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  return { data, error };
}

// --- INVOICES ---
export async function fetchInvoices() {
  const { data } = await supabase.from('invoices').select('*').order('id', { ascending: false });
  return data || [];
}

export async function addInvoice(invoice) {
  const { data, error } = await supabase.from('invoices').insert(invoice).select().single();
  return { data, error };
}

export async function updateInvoice(id, updates) {
  const { data, error } = await supabase.from('invoices').update(updates).eq('id', id).select().single();
  return { data, error };
}

// --- DELAYS ---
export async function fetchDelays() {
  const { data } = await supabase.from('delays').select('*').order('id', { ascending: false });
  return data || [];
}

export async function addDelay(delay) {
  const { data, error } = await supabase.from('delays').insert(delay).select().single();
  return { data, error };
}

// --- NOTIFICATIONS ---
export async function fetchNotifications() {
  const { data } = await supabase.from('notifications').select('*').order('id', { ascending: false });
  return data || [];
}

export async function addNotification(notif) {
  const { data, error } = await supabase.from('notifications').insert(notif).select().single();
  return { data, error };
}

// --- NOTIFICATION RESPONSES ---
export async function fetchNotificationResponses() {
  const { data } = await supabase.from('notification_responses').select('*');
  return data || [];
}

export async function upsertNotificationResponse(notifId, carpenterName, updates) {
  const { data, error } = await supabase.from('notification_responses').upsert({
    notification_id: notifId,
    carpenter_name: carpenterName,
    ...updates
  }, { onConflict: 'notification_id,carpenter_name' }).select().single();
  return { data, error };
}

// --- FIXING REQUESTS ---
export async function fetchFixingRequests() {
  const { data } = await supabase.from('fixing_requests').select('*').order('id', { ascending: false });
  return data || [];
}

export async function addFixingRequest(req) {
  const { data, error } = await supabase.from('fixing_requests').insert(req).select().single();
  return { data, error };
}

export async function updateFixingRequest(id, updates) {
  const { data, error } = await supabase.from('fixing_requests').update(updates).eq('id', id).select().single();
  return { data, error };
}

// --- SITE FILES ---
export async function fetchSiteFiles() {
  const { data } = await supabase.from('site_files').select('*, site_file_photos(*)').order('id', { ascending: false });
  return data || [];
}

export async function addSiteFile(file) {
  const { data, error } = await supabase.from('site_files').insert(file).select().single();
  return { data, error };
}

export async function updateSiteFile(id, updates) {
  const { data, error } = await supabase.from('site_files').update(updates).eq('id', id).select().single();
  return { data, error };
}

export async function addSiteFilePhoto(photo) {
  const { data, error } = await supabase.from('site_file_photos').insert(photo).select().single();
  return { data, error };
}

// --- PRICE LISTS ---
export async function fetchPriceLists() {
  const { data } = await supabase.from('price_lists').select('*').order('builder, site, stage');
  return data || [];
}

// --- USERS ---
export async function fetchUsers() {
  const { data } = await supabase.from('users').select('*').order('employee_id');
  return data || [];
}

// --- PHOTO STORAGE ---
export async function uploadPhoto(file, fileName) {
  const { data, error } = await supabase.storage
    .from('site-photos')
    .upload(`photos/${Date.now()}-${fileName}`, file);
  if (error) return { url: null, error };
  const { data: urlData } = supabase.storage
    .from('site-photos')
    .getPublicUrl(data.path);
  return { url: urlData.publicUrl, error: null };
}

// --- REAL-TIME SUBSCRIPTIONS ---
export function subscribeToTable(table, callback) {
  return supabase
    .channel(`${table}-changes`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
      callback(payload);
    })
    .subscribe();
}

// Subscribe to multiple tables at once
export function subscribeToAll(callbacks) {
  const tables = ['allocations', 'work_log', 'invoices', 'notifications', 'notification_responses', 'delays', 'fixing_requests', 'site_files'];
  const channels = tables.map(table => {
    if (callbacks[table]) {
      return subscribeToTable(table, callbacks[table]);
    }
    return null;
  }).filter(Boolean);
  return () => channels.forEach(ch => supabase.removeChannel(ch));
}
