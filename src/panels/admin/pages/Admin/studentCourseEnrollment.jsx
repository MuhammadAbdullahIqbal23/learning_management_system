import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { RefreshCcw } from 'lucide-react';

const UserCoursesDashboard = () => {
  const [usersWithCourses, setUsersWithCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersWithEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all users instead of just students
      const usersResponse = await fetch('http://localhost:5002/api/users');
      if (!usersResponse.ok) {
        throw new Error(`Unable to fetch users (Status: ${usersResponse.status}). Please check if the server is running and the endpoint exists.`);
      }
      const usersData = await usersResponse.json();

      // Fetch enrollments and course details for each user
      const usersWithData = await Promise.all(
        usersData.users.map(async (user) => {
          try {
            // Only fetch enrollments for students
            if (user.role === 'student') {
              const enrollmentsResponse = await fetch(`http://localhost:5002/api/enrollments?studentId=${user._id}`);
              if (!enrollmentsResponse.ok) {
                throw new Error(`Failed to fetch enrollments for ${user.username}`);
              }
              const enrollmentsData = await enrollmentsResponse.json();

              // Fetch course details for each enrollment
              const coursesDetails = await Promise.all(
                enrollmentsData.enrollments.map(async (enrollment) => {
                  const courseResponse = await fetch(`http://localhost:5002/api/courses/${enrollment.courseId}`);
                  if (!courseResponse.ok) {
                    throw new Error(`Failed to fetch course details`);
                  }
                  const courseData = await courseResponse.json();
                  return {
                    ...courseData.course,
                    enrollmentStatus: enrollment.status,
                  };
                })
              );

              return {
                ...user,
                enrolledCourses: coursesDetails,
              };
            }
            // Return user without enrollments for non-students
            return {
              ...user,
              enrolledCourses: [],
            };
          } catch (err) {
            console.error(`Error fetching data for user ${user.username}:`, err);
            return {
              ...user,
              enrolledCourses: [],
              error: err.message,
            };
          }
        })
      );

      setUsersWithCourses(usersWithData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin">
          <RefreshCcw className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-lg text-gray-600">Loading users and their courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchUsersWithEnrollments}
                className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Dashboard</h1>
        <button
          onClick={fetchUsersWithEnrollments}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {usersWithCourses.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent>
            <p className="text-gray-500">No users found in the system</p>
          </CardContent>
        </Card>
      ) : (
        usersWithCourses.map((user) => (
          <Card key={user._id} className="mb-6 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                {user.username}
                <Badge variant={user.role === 'student' ? 'secondary' : 'outline'}>
                  {user.role}
                </Badge>
              </CardTitle>
              <span className="text-sm text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </CardHeader>
            <CardContent>
              {user.error ? (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
                  {user.error}
                </div>
              ) : user.role !== 'student' ? (
                <p className="text-center text-gray-500">Not a student user</p>
              ) : user.enrolledCourses.length === 0 ? (
                <p className="text-center text-gray-500">No courses enrolled</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Enrollment Status</TableHead>
                      <TableHead className="text-right">Enrolled Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.enrolledCourses.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={course.enrollmentStatus === 'active' ? 'default' : 'destructive'}
                          >
                            {course.enrollmentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserCoursesDashboard;