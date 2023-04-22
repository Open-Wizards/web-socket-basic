import { Router, Request, Response } from 'express';
import { broadcastReview, braodcastDelete } from './socket';
import Review from './models/reviews'

const routes = Router();

routes.get('/', async (request: Request, response: Response) => {
  const reviews = await Review.find({}, { __v: 0 }).lean().exec();

  if (reviews) {
    return response.json(reviews);
  } else {
    return response.status(400).json({ message: 'Error getting reviews' });
  }
});

routes.get('/review/:id', async (request: Request, response: Response) => {
  const reviews = await Review.find(
    { _id: request.params.id },
  ).lean().exec();

  console.log(reviews)

  if (reviews) {
    return response.json(reviews);
  } else {
    return response.status(400).json({ message: 'Error getting reviews' });
  }
});

routes.post('/review', async (request: Request, response: Response) => {
  try {

    const { content, title } = request.body;

    if (!content || !title) {
      return response.status(400).json({ message: 'Missing content or title' });
    }

    const newReview = await Review.create({
      title,
      content
    })

    if (newReview) {
      broadcastReview(newReview);
      return response.status(201).json({ message: 'Review created' });
    } else {
      return response.status(400).json({ message: 'Error creating review' });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
});

routes.put('/review/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { content, title } = request.body;

    if (id.length !== 24) {
      return response.status(400).json({ message: 'Invalid id' });
    }
    if (!content || !title) {
      return response.status(400).json({ message: 'Missing content or title' });
    }

    const updatesReview = await Review.findByIdAndUpdate(id, { content, title }, { new: true }).exec();

    if (updatesReview) {
      broadcastReview(updatesReview);
      return response.status(201).json({ message: 'Review updated' });
    } else {
      return response.status(400).json({ message: 'Error updating review' });
    }

  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
});

routes.delete('/review/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (id.length !== 24) {
      return response.status(400).json({ message: 'Invalid id' });
    }

    const deletedReview = await Review.findByIdAndDelete(id).exec();

    if (deletedReview) {

      braodcastDelete(id)

      return response.status(201).json({ message: 'Review deleted' });
    } else {
      return response.status(400).json({ message: 'Error deleting review' });
    }
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
    
  }
});

export default routes;
