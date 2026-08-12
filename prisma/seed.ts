import {
  PrismaClient,
  OrganizationRole,
  OrganizationType,
  TicketPriority,
  TicketSource,
  TicketStatus,
  MessageDirection,
  MessageStatus,
} from '@prisma/client';

import { auth } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing demo data
  await prisma.message.deleteMany();
  await prisma.ticketTag.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.organizationUser.deleteMany();
  await prisma.organization.deleteMany();

  // Remove demo user if it already exists
  const existingDemoUser = await prisma.user.findUnique({
    where: {
      email: 'demo@revelio.dev',
    },
  });

  if (existingDemoUser) {
    await prisma.user.delete({
      where: {
        id: existingDemoUser.id,
      },
    });
  }

  // Create demo user through Better Auth
  const result = await auth.api.signUpEmail({
    body: {
      name: 'Demo User',
      email: 'demo@revelio.dev',
      password: 'Demo!1234',
    },
  });

  if (!result.user) {
    throw new Error('Failed to create demo user');
  }

  const demoUser = result.user;

  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Revelio Demo',
      type: OrganizationType.COMPANY,
    },
  });

  // Connect demo user to organization
  await prisma.organizationUser.create({
    data: {
      userId: demoUser.id,
      organizationId: organization.id,
      role: OrganizationRole.OWNER,
    },
  });

  const clients = [
    {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+40740111222',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+40740222333',
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+40740333444',
    },
    {
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+40740444555',
    },
    {
      name: 'Daniel Miller',
      email: 'daniel@example.com',
      phone: '+40740555666',
    },
    {
      name: 'Sophie Davis',
      email: 'sophie@example.com',
      phone: '+40740666777',
    },
    {
      name: 'James Taylor',
      email: 'james@example.com',
      phone: '+40740777888',
    },
    {
      name: 'Olivia Anderson',
      email: 'olivia@example.com',
      phone: '+40740888999',
    },
    {
      name: 'Robert Thomas',
      email: 'robert@example.com',
      phone: '+40740999000',
    },
    {
      name: 'Emily Moore',
      email: 'emily@example.com',
      phone: '+40740000111',
    },
  ];

  const subjects = [
    'Cannot access my account',
    'Question about my order',
    'Payment issue',
    'Need help with my account',
    'Product information',
    'Refund request',
    'Login problem',
    'Order status',
    'Technical issue',
    'General question',
  ];

  const statuses = [
    TicketStatus.NEW,
    TicketStatus.IN_PROGRESS,
    TicketStatus.WAITING_CLIENT,
    TicketStatus.CLOSED,
  ];

  const priorities = [
    TicketPriority.LOW,
    TicketPriority.MEDIUM,
    TicketPriority.HIGH,
  ];

  const sources = [TicketSource.WHATSAPP, TicketSource.WEB, TicketSource.PHONE];

  for (let i = 0; i < clients.length; i++) {
    const client = await prisma.contact.create({
      data: {
        organizationId: organization.id,
        name: clients[i].name,
        email: clients[i].email,
        phone: clients[i].phone,
      },
    });

    const ticket = await prisma.ticket.create({
      data: {
        organizationId: organization.id,
        contactId: client.id,
        subject: subjects[i],
        status: statuses[i % statuses.length],
        priority: priorities[i % priorities.length],
        source: sources[i % sources.length],
        assignedToId: demoUser.id,
        internalNotes: i % 3 === 0 ? 'Customer requires follow-up.' : null,
      },
    });

    await prisma.message.create({
      data: {
        ticketId: ticket.id,
        direction: MessageDirection.INBOUND,
        body: [
          'Hi, I cannot access my account.',
          'Hello, I have a question about my order.',
          'My payment seems to have failed.',
          'I need some help with my account.',
          'Could you give me more information about this product?',
          'I would like to request a refund.',
          'I cannot log into my account.',
          'Can you tell me the status of my order?',
          'I am experiencing a technical issue.',
          'I have a general question about your service.',
        ][i],
        status: MessageStatus.DELIVERED,
      },
    });

    if (i % 2 === 0) {
      await prisma.message.create({
        data: {
          ticketId: ticket.id,
          direction: MessageDirection.OUTBOUND,
          sentByUserId: demoUser.id,
          body: 'Thanks for reaching out. We are looking into this and will get back to you shortly.',
          status: MessageStatus.SENT,
        },
      });
    }
  }

  console.log('');
  console.log('✅ Seed completed!');
  console.log('');
  console.log('Demo login:');
  console.log('Email:    demo@revelio.dev');
  console.log('Password: Demo!1234');
  console.log('');
  console.log('Created:');
  console.log('- 1 demo user');
  console.log('- 1 organization');
  console.log('- 10 clients');
  console.log('- 10 tickets');
  console.log('- ticket messages');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
