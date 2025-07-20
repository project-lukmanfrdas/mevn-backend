/**
 * Constructs a standardized paginated response object.
 *
 */
export const paginatedResponse = ({ data, page, limit, total }) => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
