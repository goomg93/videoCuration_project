import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const LIST_ID = process.env.LIST_ID;
    return { LIST_ID };
  },
});

const { query } = createTestClient(server);

describe('find video logic', () => {
  test('find video', async () => {
    const FIND_VIDEO = gql`
      query {
        video(id: 2) {
          id
        }
      }
    `;
    const {
      data: { video },
    } = await query({ query: FIND_VIDEO });

    expect(video).toEqual({
      id: 2,
    });
  });

  test('not input error when find video', async () => {
    const FIND_VIDEO = gql`
      query {
        video {
          id
        }
      }
    `;
    const {
      errors: [error],
    } = await query({ query: FIND_VIDEO });

    expect(error.message).toEqual('not input');
  });

  test('invalid id error when find video', async () => {
    const FIND_VIDEO = gql`
      query {
        video(id: -1) {
          id
        }
      }
    `;
    const {
      errors: [error],
    } = await query({ query: FIND_VIDEO });

    expect(error.message).toEqual('Invalid id');
  });

  test('invalid id error when find video', async () => {
    const FIND_VIDEO = gql`
      query {
        video(videoId: "string") {
          id
        }
      }
    `;
    const {
      errors: [error],
    } = await query({ query: FIND_VIDEO });

    expect(error.message).toEqual('Invalid videoId');
  });

  test('find videos', async () => {
    const FIND_VIDEO = gql`
      query {
        videos {
          id
        }
      }
    `;
    const {
      data: { videos },
    } = await query({ query: FIND_VIDEO });

    expect(videos.length).toBeGreaterThan(2);
  });
});

test('correct videoPagination start index 1', async () => {
  const FIND_VIDEO_PAGINATION = gql`
    query ($limit: Int!, $index: Int!) {
      videoPagination(limit: $limit, index: $index) {
        id
        videoId
        thumbnails
        title
      }
    }
  `;
  const {
    data: { videoPagination },
  } = await query({ query: FIND_VIDEO_PAGINATION, variables: { limit: 10, index: 1 } });

  expect(videoPagination.length).toEqual(11);
});

test('correct videoPagination', async () => {
  const FIND_VIDEO_PAGINATION = gql`
    query ($limit: Int!, $index: Int!) {
      videoPagination(limit: $limit, index: $index) {
        id
        videoId
        thumbnails
        title
      }
    }
  `;
  const {
    data: { videoPagination },
  } = await query({ query: FIND_VIDEO_PAGINATION, variables: { limit: 10, index: 11 } });

  expect(videoPagination.length).toEqual(10);
});

test('videoFilterByCategory', async () => {
  const FILTER_VIDEO_BY_CATEGORY = gql`
    query videoFilterByCategory {
      videoFilterByCategory(category: "ASMR") {
        videoId
        thumbnails
        category
        title
      }
    }
  `;
  const {
    data: { videoFilterByCategory },
  } = await query({ query: FILTER_VIDEO_BY_CATEGORY });

  expect(videoFilterByCategory.filter(el => !el.category.includes('ASMR')).length).toEqual(0);
});
