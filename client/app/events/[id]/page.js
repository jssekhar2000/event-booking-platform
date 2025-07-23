import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import axios from '@/lib/axios-server';
import EventPageClientWrapper from './EventPageClientWrapper';
import EventPageSkeleton from './EventPageSkeleton';

export const revalidate = 300;


export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const res = await axios.get(`/events/${id}`);
    const event = res.data;
    
    return {
      title: `${event.title} | Event Details`,
      description: event.shortDescription || event.longDescription?.substring(0, 160),
      openGraph: {
        title: event.title,
        description: event.shortDescription,
        images: [event.imageUrl],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description: event.shortDescription,
        images: [event.imageUrl],
      },
    };
  } catch {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const res = await axios.get('/events?featured=true&limit=50');
    return res.data.map((event) => ({ 
      id: event.id.toString() 
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  try {
    const res = await axios.get(`/events/${id}`);
    const event = res.data;
    if (!event || !event.title || !event.date) {
      return notFound();
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<EventPageSkeleton />}>
          <EventPageClientWrapper event={event} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}