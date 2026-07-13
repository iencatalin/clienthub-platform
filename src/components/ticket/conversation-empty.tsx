export default function ConversationEmpty() {
  return (
    <div className='flex min-h-60 items-center justify-center rounded-lg border border-dashed'>
      <div className='text-center'>
        <h3 className='font-medium'>No conversation available</h3>

        <p className='mt-2 text-sm text-muted-foreground'>
          Conversations are available only for WhatsApp and Email tickets.
        </p>
      </div>
    </div>
  );
}
