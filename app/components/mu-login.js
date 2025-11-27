import MuLoginComponent from 'ember-mu-login/components/mu-login';

export default class MyMuLoginComponent extends MuLoginComponent {
  handleNicknameInput = (event) => {
    this.nickname = event.target.value.trim();
  };

  handlePasswordInput = (event) => {
    this.password = event.target.value.trim();
  };
}
