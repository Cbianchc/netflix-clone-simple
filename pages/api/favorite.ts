import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //primero menejo el metodo post
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      //ahora buscamos la movie, usando el movieID
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      })

      if (!existingMovie) {
        throw new Error('ID Invalido');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          }
        }
      });
      return res.status(200).json(user);
    }
    // hasta aca fue el post req, para cuando quiero agregar una movie a favoritos.
    //ahora viene la delete req,, para cuando quiero ssacarlo de favoritos.
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);
    
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      })

      if (!existingMovie) {
        throw new Error('Id Invalido')
      }

      //importamos without para que ahora puede buscar y sacarle el id para mostrar.
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      return res.status(200).json(updatedUser);
    }
    return res.status(405).end(); 
    //esta liena es por si recibimos un metodo que no es de los declarados
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}