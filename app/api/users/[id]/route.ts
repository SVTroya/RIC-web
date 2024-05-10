import {connectToDB} from '@utils/database'
import User from '@models/user'
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const {expList} = await req.json()

  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    user.expList = expList;

    await user.save();

    return new Response("User successfully updated", { status: 200 });
  } catch (error) {
    return new Response("Error Updating User!", { status: 500 });
  }
}