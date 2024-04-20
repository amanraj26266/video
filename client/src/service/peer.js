class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();



// class PeerService {
//   constructor() {
//     this.peer = new RTCPeerConnection({
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:global.stun.twilio.com:3478' }
//       ]
//     });

//     // Listen for ICE candidates and other necessary events if needed.
//   }

//   async getOffer() {
//     const offer = await this.peer.createOffer();
//     await this.peer.setLocalDescription(offer);
//     return offer;
//   }

//   async getAnswer(offer) {
//     await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await this.peer.createAnswer();
//     await this.peer.setLocalDescription(answer);
//     return answer;
//   }

//   async setRemoteDescription(ans) {
//     await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
//   }
// }

// export default new PeerService();
