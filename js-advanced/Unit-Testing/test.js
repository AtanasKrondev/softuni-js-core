const { expect } = require('chai');
const SoftUniFy = require('./03. Softunify');

describe('SoftUniFy', function () {
    describe('Has constructor and initializes', function () {
        it('allSongs', function () {
            let player = new SoftUniFy();
            expect(player.allSongs).to.be.an('object');
        });
        it('allSongs', function () {
            let player = new SoftUniFy();
            expect(player.allSongs).to.eql({});
        });
        it('allSongs', function () {
            let player = new SoftUniFy();
            expect(player).to.be.an.instanceOf(SoftUniFy);
        });
    });
    describe('downloadSongs', function () {
        it('downloads a song', function () {
            let player = new SoftUniFy();
            player.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            expect(player.allSongs.hasOwnProperty('Eminem')).to.equal(true);
            expect(player.allSongs['Eminem']).to.eql({ rate: 0, votes: 0, songs: ['Venom - Knock, Knock let the devil in...'] });
        });
        it('downloads multiple songs', function () {
            let player = new SoftUniFy();
            player.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            player.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            player.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');
            expect(Object.keys(player.allSongs).length).to.equal(2);
            expect(player.allSongs['Eminem']).to.eql({ rate: 0, votes: 0, songs: ['Venom - Knock, Knock let the devil in...', 'Phenomenal - IM PHENOMENAL...'] });

        })
    })
    describe('playSongs', function () {
        it('plays empty', function () {
            let player = new SoftUniFy();
            let song = 'tralala'
            let empty = player.playSong(song);
            expect(empty).to.equal(`You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`)
        });
        it('plays a song', function () {
            let player = new SoftUniFy();
            player.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            player.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            player.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');
            let song = player.playSong('Phenomenal');
            expect(song).to.equal('Eminem:\nPhenomenal - IM PHENOMENAL...\n');
        })
    })
    describe('songList', function () {
        it('empty songlist', function () {
            let player = new SoftUniFy();
            let output = player.songsList;
            expect(output).to.equal('Your song list is empty')
        })
        it('returns songlist', function () {
            let player = new SoftUniFy();
            player.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            player.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            player.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');
            let songslist = player.songsList;
            expect(songslist).to.equal('Venom - Knock, Knock let the devil in...\nPhenomenal - IM PHENOMENAL...\nLight Me On Fire - You can call me a liar.. ')
        })
    })
    describe('rateArtist', function () {
        it('artist not found', function () {
            let player = new SoftUniFy();
            let empty1 = player.rateArtist('Gosho');
            let empty2 = player.rateArtist('Pesho', 3000);
            expect(empty1).to.equal(`The Gosho is not on your artist list.`);
            expect(empty2).to.equal(`The Pesho is not on your artist list.`);
        });
        it('zero rate', function () {
            let sofunify = new SoftUniFy();
            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            let zeroRate = sofunify.rateArtist('Eminem');
            expect(zeroRate).to.equal(0);
        })
        it('NaN rate', function () {
            let sofunify = new SoftUniFy();
            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            sofunify.rateArtist('Eminem');
            sofunify.rateArtist('Eminem', 'ku4e');
            sofunify.rateArtist('Eminem', 20);
            let nanrate = sofunify.rateArtist('Eminem', 1);
            expect(nanrate).to.equal(0);
        })
        it('rates right', function () {
            let sofunify = new SoftUniFy();
            sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            sofunify.rateArtist('Eminem');
            sofunify.rateArtist('Eminem', 2);
            let rate = sofunify.rateArtist('Eminem', 4);
            expect(rate).to.equal(3);
        })
    })
})
