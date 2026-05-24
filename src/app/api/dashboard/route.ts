import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'
import Project from '@/models/Project'
import Review from '@/models/Review'
import { Gallery, ContactInquiry } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()

    const [
      totalServices,
      totalProjects,
      ongoingProjects,
      completedProjects,
      totalReviews,
      totalInquiries,
      newInquiries,
      galleryImages,
    ] = await Promise.all([
      Service.countDocuments({ isActive: true }),
      Project.countDocuments({ isActive: true }),
      Project.countDocuments({ status: 'ongoing' }),
      Project.countDocuments({ status: 'completed' }),
      Review.countDocuments({ isActive: true }),
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ status: 'new' }),
      Gallery.countDocuments({ isActive: true }),
    ])

    // Monthly inquiries (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyData = await ContactInquiry.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ])

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthlyInquiries = monthlyData.map((d) => ({
      month: months[d._id.month - 1],
      count: d.count,
    }))

    const projectsByStatus = [
      { status: 'Ongoing', count: ongoingProjects },
      { status: 'Completed', count: completedProjects },
      { status: 'Upcoming', count: await Project.countDocuments({ status: 'upcoming' }) },
    ]

    return NextResponse.json({
      success: true,
      data: {
        totalServices, totalProjects, ongoingProjects, completedProjects,
        totalReviews, totalInquiries, newInquiries, galleryImages,
        monthlyInquiries, projectsByStatus,
      },
    })
  } catch (error) {
    console.error('Dashboard analytics error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch analytics' }, { status: 500 })
  }
}
