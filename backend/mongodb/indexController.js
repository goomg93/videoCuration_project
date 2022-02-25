import { client } from './chatDataHandler';

export default async function getNextSequenceValue(sequenceName, roomId) {
  const sequenceDocument = await client
    .db(`room_${roomId}`)
    .collection('counters')
    .findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { returnOriginal: false }
    );

  return sequenceDocument.value.sequence_value;
}
