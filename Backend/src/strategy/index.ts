import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { LocalStrategyOption, LocalVerify } from './LocalStrategy';

export default () => {
  passport.use('local', new LocalStrategy(LocalStrategyOption, LocalVerify));
};
