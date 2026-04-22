import type { ComplianceRecord, ComplaintRecord } from '@/lib/domain/models'
import { complaintRepository, complianceRepository } from '@/lib/repositories'

export async function upsertComplianceRecord(record: ComplianceRecord) {
  return complianceRepository.upsert({ ...record, updatedAt: new Date().toISOString() })
}

export async function logComplaint(record: ComplaintRecord) {
  return complaintRepository.upsert({ ...record, updatedAt: new Date().toISOString() })
}

export async function getComplianceSummary() {
  const records = await complianceRepository.list()
  const complaints = await complaintRepository.list()

  return {
    totalRecords: records.length,
    pendingReview: records.filter(r => r.status === 'pending_review').length,
    missing: records.filter(r => r.status === 'missing').length,
    openComplaints: complaints.filter(c => c.status === 'open' || c.status === 'investigating').length,
  }
}
