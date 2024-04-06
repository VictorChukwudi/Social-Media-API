export const paginateFeed= (posts: any[], currentPage: number = 1, pageSize: number = 5)=> {
    let totalPages = Math.ceil(posts.length / pageSize);
    // Calculate start and end index for the current page

    if(currentPage > totalPages){
        currentPage=1;
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, posts.length);
  
    // Slice the array to get the articles for the current page
    const paginatedPosts = posts.slice(startIndex, endIndex);
  
    // Return an object with paginated data and metadata
    return {
      paginatedPosts,
      currentPage,
      pageSize,
      totalPages,
    };
  }
  
 