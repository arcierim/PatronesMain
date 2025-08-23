import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-twitter-oauth2';

@Injectable()
export class XStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      clientID: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL:
        process.env.TWITTER_CALLBACK_URL ||
        'http://localhost:3000/auth/twitter/callback',
      scope: ['tweet.read', 'users.read', 'offline.access'],
    });
  }
// eslint-disable-next-line @typescript-eslint/require-await
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ): Promise<any> {
    const user = {
      provider: 'twitter',
      providerId: profile.id,
      username: (profile as any).username || profile.displayName,
      displayName: profile.displayName,
      picture: profile.photos?.[0]?.value,
      accessToken,
    };
    done(null, user);
  }
}
