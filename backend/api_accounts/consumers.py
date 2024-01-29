from channels.generic.websocket import AsyncWebsocketConsumer

import json

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_session_id = self.scope['url_route']['kwargs']['game_session_id']
        self.room_group_name = 'pong_%s' % self.game_session_id

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # notify both players to start game
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': {'action': 'start_game'}
            }
        )

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': message
            }
        )

    # Receive message from room group
    async def game_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))