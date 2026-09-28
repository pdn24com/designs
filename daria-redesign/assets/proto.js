/* Daria "Dock" concept — interactive prototype engine (recommended concept).
   SIMULATION: no audio plays, no file is read or written, Android dialogs and pickers are imitations.
   One state object renders every screen; DK.App.html(state) is also used for the static gallery. */
(function(){
const K = window.DK, ic = K.ic, esc = K.esc;

/* ---------------- strings (EN / FA) ---------------- */
const T = {
  songs:['Songs','آهنگ‌ها'], playlists:['Playlists','پلی‌لیست‌ها'], albums:['Albums','آلبوم‌ها'], artists:['Artists','هنرمندان'], folders:['Folders','پوشه‌ها'],
  nSongs:['{0} songs','{0} آهنگ'], nSong1:['1 song','۱ آهنگ'], nAlbums:['{0} albums','{0} آلبوم'], nArtists:['{0} artists','{0} هنرمند'], nFolders:['{0} folders','{0} پوشه'],
  hiddenPill:['{0} hidden','{0} پنهان'], sortAdded:['Recently added','تازه‌ترین'], sortTitle:['Title','عنوان'], sortArtist:['Artist','هنرمند'],
  search:['Search songs, albums, artists','جست‌وجوی آهنگ، آلبوم، هنرمند'], searchShort:['Search','جست‌وجو'],
  settings:['Settings','تنظیمات'], back:['Back','بازگشت'], more:['More options','گزینه‌های بیشتر'],
  play:['Play','پخش'], pause:['Pause','توقف'], shuffle:['Shuffle','درهم'], next:['Next','بعدی'], prev:['Previous','قبلی'],
  repeatOff:['Repeat off','تکرار خاموش'], repeatAll:['Repeat all','تکرار همه'], repeatOne:['Repeat one','تکرار یک آهنگ'],
  unknownArtist:['Unknown artist','هنرمند نامشخص'], unknownLen:['Unknown length','مدت نامشخص'],
  playingFrom:['Playing from {0}','در حال پخش از {0}'],
  faceCover:['Cover','کاور'], faceLyrics:['Lyrics','متن'], faceQueue:['Up next','بعدی‌ها'],
  timer:['Sleep timer','تایمر خواب'], addPl:['Add to playlist','افزودن به پلی‌لیست'], collapse:['Close player','بستن پخش‌کننده'],
  fav:['Favourite','علاقه‌مندی'], unfav:['Remove from favourites','حذف از علاقه‌مندی‌ها'],
  playNow:['Play now','پخش کن'], playNext:['Play next','پخش بعدی'], addQueue:['Add to queue','افزودن به صف'],
  grpSession:['This listening session','همین پخش'], grpKeep:['Keep','نگه‌داری'], grpGo:['Go to','برو به'], grpFile:['File','فایل'],
  goAlbum:['Album','آلبوم'], goArtist:['Artist','هنرمند'], goFolder:['Folder','پوشه'],
  info:['Song info','اطلاعات آهنگ'], share:['Share file','اشتراک فایل'],
  queuedNext:['“{0}” plays next','«{0}» بعد از این پخش می‌شود'], queuedEnd:['“{0}” added to the end of the queue','«{0}» به انتهای صف اضافه شد'],
  undo:['Undo','بازگردانی'], added:['Added to {0}','به {0} اضافه شد'], already:['Already in {0}','از قبل در {0} هست'],
  newPl:['New playlist','پلی‌لیست تازه'], yourPl:['Your playlists','پلی‌لیست‌های شما'], auto:['Made from your listening','ساخته‌شده از شنیده‌های شما'],
  plName:['Playlist name','نام پلی‌لیست'], create:['Create','بساز'], cancel:['Cancel','لغو'], rename:['Rename','تغییر نام'], del:['Delete','حذف'],
  errBlank:['Enter a name.','یک نام وارد کنید.'], errDup:['You already have a playlist called “{0}”.','پلی‌لیستی با نام «{0}» دارید.'],
  created:['Created “{0}”','«{0}» ساخته شد'], createdAdded:['Created “{0}” and added the song','«{0}» ساخته شد و آهنگ اضافه شد'],
  delQ:['Delete “{0}”?','«{0}» حذف شود؟'], delBody:['The playlist is removed. The songs stay on this phone.','پلی‌لیست حذف می‌شود. آهنگ‌ها روی گوشی می‌مانند.'], deleted:['Deleted “{0}”','«{0}» حذف شد'],
  addSongs:['Add songs','افزودن آهنگ'], addN:['Add {0} songs','افزودن {0} آهنگ'], add1:['Add 1 song','افزودن ۱ آهنگ'], selectSongs:['Select songs to add','آهنگ‌ها را انتخاب کنید'],
  discardSelQ:['Discard your selection?','انتخاب‌ها کنار گذاشته شود؟'], discardSelB:['{0} selected songs will not be added.','{0} آهنگ انتخاب‌شده اضافه نمی‌شود.'], keepSel:['Keep selecting','ادامهٔ انتخاب'], discard:['Discard','کنار بگذار'],
  emptyPl:['Nothing here yet','هنوز چیزی نیست'], emptyPlB:['Add songs from your library. They stay in your files too.','آهنگ‌ها را از کتابخانه اضافه کنید.'],
  removeFromPl:['Remove from this playlist','حذف از این پلی‌لیست'], removedFromPl:['Removed from {0}','از {0} حذف شد'],
  hiddenInPl:['{0} songs are in hidden folders','{0} آهنگ در پوشه‌های پنهان است'], show:['Show','نمایش'], hideThese:['Hide','پنهان کن'], inHidden:['Hidden folder','پوشهٔ پنهان'],
  missing:['File missing','فایل پیدا نشد'],
  hideFolder:['Hide from library','پنهان کردن از کتابخانه'], showFolder:['Show in library','نمایش در کتابخانه'], hiddenFolders:['Hidden from library','پنهان از کتابخانه'],
  folderHidden:['“{0}” hidden · {1} songs','«{0}» پنهان شد · {1} آهنگ'], folderShown:['“{0}” is back in your library','«{0}» به کتابخانه برگشت'],
  libSettings:['Library settings','تنظیمات کتابخانه'], whyHidden:['Why some songs are hidden','چرا برخی آهنگ‌ها پنهان‌اند'],
  whyHiddenB:['Your settings hide these from browsing and search. Files, playlists and the current queue are not changed.','تنظیمات شما این‌ها را از مرور و جست‌وجو پنهان می‌کند. فایل‌ها، پلی‌لیست‌ها و صف فعلی تغییر نمی‌کنند.'],
  fromFolder:['Folder “{0}”','پوشهٔ «{0}»'], shorterThan:['Shorter than {0}','کوتاه‌تر از {0}'], unknownHidden:['Unknown length','مدت نامشخص'],
  queue:['Queue','صف'], ofN:['{0} of {1}','{0} از {1}'], earlier:['Earlier · {0} songs','قبلی‌ها · {0} آهنگ'], upNext:['Up next','بعدی‌ها'],
  clearQ:['Clear queue','پاک کردن صف'], clearQQ:['Clear the queue?','صف پاک شود؟'], clearQB:['Playback stops and the queue is emptied. The songs stay on this phone. A running sleep timer is cancelled.','پخش متوقف و صف خالی می‌شود. آهنگ‌ها روی گوشی می‌مانند. تایمر خواب لغو می‌شود.'],
  select:['Select','انتخاب'], removeN:['Remove {0}','حذف {0}'], removedQ:['Removed from queue','از صف حذف شد'], removedQN:['{0} removed from queue','{0} مورد از صف حذف شد'],
  moveUp:['Move up','بالاتر'], moveDown:['Move down','پایین‌تر'], removeQ:['Remove from queue','حذف از صف'], saveQ:['Save queue as playlist','ذخیرهٔ صف به‌صورت پلی‌لیست'],
  fromQ:['From {0}','از {0}'],
  lyrNone:['No lyrics for this song','متنی برای این آهنگ نیست'], lyrNoneB:['Daria shows lyrics saved inside the song file. You can also add a lyrics file (.lrc or .txt) for this song.','داریا متن ذخیره‌شده در خود فایل را نشان می‌دهد. می‌توانید فایل متن (.lrc یا .txt) هم اضافه کنید.'], lyrImport:['Add lyrics file','افزودن فایل متن'],
  lyrImported:['Lyrics added for this song','متن برای این آهنگ اضافه شد'], lyrPlain:['Not synced to the music','همگام با آهنگ نیست'],
  tmOff:['Sleep timer','تایمر خواب'], tmIntro:['Time keeps counting during pauses and calls. The last 5 seconds fade out.','زمان در توقف و تماس هم می‌گذرد. ۵ ثانیهٔ آخر آرام کم می‌شود.'],
  min:['min','دقیقه'], eos:['End of this song','پایان همین آهنگ'], eosB:['Pause when it ends','وقتی تمام شد، توقف'], custom:['Custom minutes','دقیقهٔ دلخواه'], customHint:['A whole number from 1 to 180','عدد صحیح از ۱ تا ۱۸۰'],
  customErr:['Choose 1 to 180 minutes.','بین ۱ تا ۱۸۰ دقیقه انتخاب کنید.'], start:['Start','شروع'], starting:['Starting…','در حال شروع…'],
  pausingIn:['Pausing in','توقف تا'], pausesAt:['Pauses at {0}, after a 5-second fade','ساعت {0} با کاهش ۵ثانیه‌ای متوقف می‌شود'], plus10:['+10 min','+۱۰ دقیقه'], change:['Change time','تغییر زمان'], cancelT:['Cancel timer','لغو تایمر'],
  plus10Err:['Adding 10 minutes would go past 3 hours. Choose a new time instead.','افزودن ۱۰ دقیقه از ۳ ساعت بیشتر می‌شود. زمان تازه‌ای انتخاب کنید.'],
  pausingAfter:['Pausing after this song','بعد از این آهنگ متوقف می‌شود'], aboutLeft:['About {0} min left','حدود {0} دقیقه مانده'],
  changeT:['Change sleep timer','تغییر تایمر خواب'], changeTB:['The current timer keeps running until you apply a change.','تایمر فعلی تا اعمال تغییر ادامه دارد.'], keepCur:['Keep current timer','همین تایمر بماند'], apply:['Apply','اعمال'],
  currentT:['Current: pauses in {0} min','فعلی: توقف تا {0} دقیقه'], currentEos:['Current: pauses after “{0}”','فعلی: توقف پس از «{0}»'],
  tmSet:['Timer set · {0} min','تایمر · {0} دقیقه'], tmEosSet:['Pausing after this song','پس از این آهنگ متوقف می‌شود'], tmCancelled:['Sleep timer cancelled','تایمر خواب لغو شد'],
  tmSaveFail:['The timer is running but could not be saved. If Daria restarts, an older timer may return.','تایمر فعال است اما ذخیره نشد. اگر داریا دوباره باز شود، ممکن است تایمر قبلی برگردد.'], retrySave:['Retry saving','ذخیرهٔ دوباره'], savedOk:['Timer saved','تایمر ذخیره شد'],
  pausedByTimer:['Paused by sleep timer','با تایمر خواب متوقف شد'], pausedByTimerB:['Stopped at {0}. Your place and queue are kept.','ساعت {0} متوقف شد. جای پخش و صف حفظ شده است.'], dismiss:['Dismiss','بستن'],
  noSession:['Nothing is playing. Choose a song to use the sleep timer.','چیزی پخش نمی‌شود. برای تایمر، آهنگی انتخاب کنید.'],
  fading:['Fading out…','در حال کم شدن صدا…'],
  cantPlay:['Can’t play “{0}”','«{0}» پخش نمی‌شود'], cantPlayB:['The file is no longer on this phone. Nothing was skipped automatically.','فایل دیگر روی گوشی نیست. چیزی خودکار رد نشد.'], playNextSong:['Play next song','پخش آهنگ بعدی'],
  infoTitle:['Song info','اطلاعات آهنگ'], editTags:['Edit tags','ویرایش برچسب‌ها'], editNA:['Editing works for MP3 files. This is a {0} file.','ویرایش فقط برای MP3 است. این فایل {0} است.'],
  secTags:['From the file’s tags ({0})','از برچسب‌های فایل ({0})'], secIndex:['From Android’s media index','از فهرست رسانهٔ اندروید'], notInFile:['Not in this file','در این فایل نیست'],
  secFile:['File','فایل'], secAudio:['Audio','صدا'], secLyr:['Lyrics','متن'], title:['Title','عنوان'], artist:['Artist','هنرمند'], album:['Album','آلبوم'], albumArtist:['Album artist','هنرمند آلبوم'], year:['Year','سال'], track:['Track number','شمارهٔ قطعه'], genre:['Genre','ژانر'], disc:['Disc','دیسک'], cover:['Cover','کاور'],
  fileName:['File name','نام فایل'], location:['Location','مکان'], format:['Format','قالب'], size:['Size','حجم'], modified:['Modified','تغییر'], addedOn:['Added to this phone','افزوده به گوشی'], length:['Length','مدت'], bitrate:['Bitrate','نرخ بیت'], rate:['Sample rate','نرخ نمونه'], channels:['Channels','کانال‌ها'],
  titleFromFile:['From the file name — no title tag','از نام فایل — برچسب عنوان ندارد'],
  lyrSynced:['Synced lyrics inside the file','متن همگام در فایل'], lyrPlainIn:['Lyrics text inside the file','متن داخل فایل'], lyrNoneRow:['None found','پیدا نشد'],
  idxPending:['Saved to the file. Android’s library may show the old tags for a moment.','در فایل ذخیره شد. فهرست اندروید ممکن است کمی برچسب قبلی را نشان دهد.'],
  edTitle:['Edit tags','ویرایش برچسب‌ها'], save:['Save','ذخیره'], saving:['Saving…','در حال ذخیره…'],
  edWrites:['Saving rewrites “{0}” on this phone. Android may ask you to allow it.','ذخیره، خود فایل «{0}» را تغییر می‌دهد. ممکن است اندروید اجازه بخواهد.'],
  edPlaying:['This song is playing. It will pause for a moment while saving.','این آهنگ در حال پخش است و هنگام ذخیره لحظه‌ای مکث می‌کند.'],
  edCurrent:['This is the current song. Saving may briefly interrupt it.','این آهنگ فعلی است. ذخیره ممکن است لحظه‌ای آن را قطع کند.'],
  keep:['Keep','بماند'], changeCover:['Change','تغییر'], remove:['Remove','حذف'], coverKeep:['Current cover','کاور فعلی'], coverNew:['New cover from your photos','کاور تازه از عکس‌ها'], coverRemove:['Cover will be removed','کاور حذف می‌شود'],
  yearErr:['Use a 4-digit year, for example 1999.','سال چهاررقمی، مثلاً ۱۹۹۹.'], trackErr:['Use a number like 3 or 3/12.','عددی مثل ۳ یا ۳/۱۲.'], normalized:['Will be saved as {0}','به‌صورت {0} ذخیره می‌شود'],
  emptyRemoves:['Empty field removes this tag','خالی گذاشتن، این برچسب را حذف می‌کند'], changed:['Changed','تغییر کرد'],
  discardQ:['Discard your changes?','تغییرات کنار گذاشته شود؟'], discardB:['Your edits to this song have not been saved.','ویرایش‌ها ذخیره نشده‌اند.'], keepEditing:['Keep editing','ادامهٔ ویرایش'],
  denied:['Android didn’t allow changes to this file. Your edits are still here.','اندروید اجازهٔ تغییر فایل را نداد. ویرایش‌ها سر جایشان است.'], tryAgain:['Try again','دوباره'],
  extChanged:['This file changed outside Daria after you opened it. Reload its tags; your edits stay as a draft to re-apply.','فایل بیرون از داریا تغییر کرد. برچسب‌ها را دوباره بخوانید؛ ویرایش‌ها به‌صورت پیش‌نویس می‌مانند.'], reload:['Reload tags','خواندن دوباره'],
  writeFail:['Saving stopped partway. The original file was kept as a copy.','ذخیره نیمه‌کاره ماند. نسخهٔ اصلی نگه داشته شد.'], restore:['Restore original','بازگرداندن اصلی'],
  noSpace:['Not enough free space to save this file safely. Free up {0} and try again.','فضای کافی نیست. {0} آزاد کنید و دوباره امتحان کنید.'],
  savedFile:['Saved to the file','در فایل ذخیره شد'], restored:['Original file restored','فایل اصلی بازگردانده شد'],
  shareMissing:['Can’t share: the file is no longer on this phone.','اشتراک ممکن نیست: فایل روی گوشی نیست.'],
  setLib:['Library','کتابخانه'], setFolders:['Folders','پوشه‌ها'], setMin:['Minimum song length','حداقل مدت آهنگ'], setRefresh:['Refresh library','به‌روزرسانی کتابخانه'], setAppearance:['Appearance','ظاهر'],
  sys:['System','سیستم'], light:['Light','روشن'], dark:['Dark','تیره'], about:['About Daria Music','دربارهٔ داریا'], setLyr:['Lyrics','متن آهنگ'], lyrFolder:['Lyrics files folder','پوشهٔ فایل‌های متن'], notConnected:['Not connected · later release','وصل نیست · نسخهٔ بعد'],
  allShown:['All folders shown','همهٔ پوشه‌ها نمایش داده می‌شوند'], nHiddenF:['{0} hidden · {1} songs','{0} پنهان · {1} آهنگ'], autoOn:['Updates automatically · checked {0}','خودکار · آخرین بررسی {0}'], autoOff:['Automatic updates are unavailable right now. Refresh to check for new music.','به‌روزرسانی خودکار الان ممکن نیست. برای یافتن آهنگ تازه، به‌روزرسانی کنید.'],
  refreshNow:['Refresh now','الان به‌روز کن'], refreshing:['Checking for new music…','در حال بررسی…'], refreshed:['Library is up to date','کتابخانه به‌روز است'],
  foldersExplain:['Hidden folders disappear from browsing and search. Files stay on your phone. Playlists and the current queue keep their songs. New folders are shown automatically.','پوشه‌های پنهان از مرور و جست‌وجو حذف می‌شوند. فایل‌ها روی گوشی می‌مانند. پلی‌لیست‌ها و صف فعلی آهنگ‌هایشان را نگه می‌دارند. پوشه‌های تازه خودکار نمایش داده می‌شوند.'],
  minExplain:['Hide short sounds such as ringtones and voice clips from your library. A song exactly at the limit is kept.','صداهای کوتاه مثل زنگ و پیام صوتی را پنهان کنید. آهنگی که دقیقاً هم‌اندازهٔ حد است می‌ماند.'],
  off:['Off','خاموش'], sec:['{0} seconds','{0} ثانیه'], minute1:['1 minute','۱ دقیقه'], minutes2:['2 minutes','۲ دقیقه'], hides:['Hides {0}','{0} پنهان'], hidesNone:['Hides none','هیچ‌کدام'],
  keepUnknown:['Keep songs with unknown length','آهنگ‌های با مدت نامشخص بمانند'], keepUnknownB:['{0} songs have no length in Android’s index. They may be real songs.','{0} آهنگ در فهرست اندروید مدت ندارند. شاید آهنگ واقعی باشند.'],
  reviewHidden:['See which songs this hides','ببینید چه آهنگ‌هایی پنهان می‌شوند'], minSet:['Minimum length: {0}','حداقل مدت: {0}'],
  shownIn:['Shown in library','در کتابخانه'], noMatch:['No matches for “{0}”','نتیجه‌ای برای «{0}» نیست'], noMatchB:['Search looks at song titles, artists, albums, playlists and folder names.','جست‌وجو در عنوان، هنرمند، آلبوم، پلی‌لیست و نام پوشه انجام می‌شود.'],
  hiddenMatches:['{0} matches are in hidden folders','{0} نتیجه در پوشه‌های پنهان است'], hiddenMatch1:['1 match is in a hidden folder','۱ نتیجه در پوشهٔ پنهان است'], reviewFolders:['Review hidden folders','بررسی پوشه‌های پنهان'], all:['All','همه'], topMatch:['Top match','بهترین نتیجه'],
  kb:['Keyboard (simulated)','صفحه‌کلید (شبیه‌سازی)'],
  permT:['Your music, on this phone','موسیقی شما، روی همین گوشی'], permB:['Daria plays audio files saved on this phone. Allow access to your music and audio to build your library. Nothing is uploaded.','داریا فایل‌های صوتی همین گوشی را پخش می‌کند. برای ساختن کتابخانه، دسترسی به صوت را بدهید. چیزی آپلود نمی‌شود.'], allow:['Allow access','اجازه دادن'],
  deniedT:['Daria can’t see your music yet','داریا هنوز آهنگ‌ها را نمی‌بیند'], deniedB:['Without access to audio files, the library stays empty. You can allow access at any time.','بدون دسترسی، کتابخانه خالی می‌ماند. هر وقت خواستید اجازه دهید.'],
  blockedT:['Access is turned off in Android settings','دسترسی در تنظیمات اندروید خاموش است'], blockedB:['Open Daria’s app settings, choose Permissions, then allow Music and audio. Come back here when you are done.','تنظیمات برنامهٔ داریا را باز کنید، «مجوزها» و سپس «موسیقی و صوت» را مجاز کنید. سپس برگردید.'], openSettings:['Open app settings','باز کردن تنظیمات برنامه'], checkAgain:['Check again','بررسی دوباره'],
  loadingT:['Reading your library…','در حال خواندن کتابخانه…'], emptyT:['No music found on this phone','آهنگی روی این گوشی پیدا نشد'], emptyB:['Daria shows audio files saved on this phone, such as MP3, M4A and FLAC. Files you just copied can take a moment to appear.','داریا فایل‌های صوتی روی گوشی مثل MP3، M4A و FLAC را نشان می‌دهد. فایل‌های تازه ممکن است کمی دیرتر ظاهر شوند.'],
  readErrT:['Couldn’t read your library','کتابخانه خوانده نشد'], readErrB:['Android’s media index didn’t respond. Your files are not affected.','فهرست رسانهٔ اندروید پاسخ نداد. فایل‌ها آسیبی ندیده‌اند.'], retry:['Retry','دوباره'],
  refreshFail:['Library couldn’t update. Showing songs from {0}.','کتابخانه به‌روز نشد. آهنگ‌های {0} نمایش داده می‌شود.'],
  allHiddenT:['All songs are hidden by your settings','همهٔ آهنگ‌ها با تنظیمات شما پنهان‌اند'], allHiddenB:['Nothing was deleted. Show a folder again or lower the minimum length.','چیزی حذف نشده. یک پوشه را نمایش دهید یا حداقل مدت را کم کنید.'],
  exitApp:['(Android Back from the library leaves the app; playback continues in the notification.)','(دکمهٔ بازگشت اندروید از کتابخانه، برنامه را می‌بندد؛ پخش در اعلان ادامه دارد.)'],
  sysAllowT:['Allow Daria Music to access music and audio on this device?','اجازه به داریا برای دسترسی به موسیقی و صوت؟'], sysAllow:['Allow','Allow'], sysDeny:['Don’t allow','Don’t allow'],
  sysModT:['Allow Daria Music to modify this audio file?','Allow Daria Music to modify this audio file?'],
  sysShare:['Sharing 1 file','Sharing 1 file'], sysPick:['Choose an image','Choose an image'], sysPickLrc:['Choose a lyrics file','Choose a lyrics file'],
  simulated:['Android system UI · simulated','رابط اندروید · شبیه‌سازی'],
  sortBy:['Sort by','مرتب‌سازی'], sortHint:['Choose the same option again to reverse the order.','انتخاب دوباره، ترتیب را برعکس می‌کند.'],
  favAdded:['Added to Favourites','به علاقه‌مندی‌ها اضافه شد'], favRemoved:['Removed from Favourites','از علاقه‌مندی‌ها حذف شد'],
  plAddSheet:['Add “{0}” to…','افزودن «{0}» به…'], plContains:['Already in this playlist','در این پلی‌لیست هست'],
  nothingPlaying:['Nothing playing','چیزی پخش نمی‌شود'], chooseSong:['Pick any song to start','یک آهنگ انتخاب کنید'],
  landscapeNote:['',''],
};
const tr = (st,k,...a) => { let s = T[k] ? T[k][st.lang==='fa'?1:0] : k; a.forEach((v,i)=>{ s = s.split('{'+i+'}').join(v); }); return s; };
const n = (st,x) => K.num(x, st.lang);
const tm = (st,x) => K.time(x, st.lang);

/* ---------------- state ---------------- */
const LIB_ORDER = K.songs.map(s=>s.id);
function init(o={}){
  const q = LIB_ORDER.map((id,i)=>({occ:i+1,id}));
  const st = {
    lang:'en', theme:'light', scale:1, w:390, h:844, rm:false, solid:false, land:false,
    perm:'granted', lib:'ready', refreshFailed:false, observeOff:false,
    stack:[{id:'library',lens:'songs'}], np:null, sheet:null, dialog:null, sys:null, snack:null, kb:false,
    sort:{key:'added',dir:'asc'},
    fav:new Set(['benevis','nightletters','geryeh']),
    playlists:K.playlists0.map(p=>({...p,items:[...p.items]})),
    hidden:new Set(), minDur:30, keepUnknown:true, missing:new Set(), lyrImported:new Set(),
    pb:{q, idx:LIB_ORDER.indexOf('benevis'), playing:false, pos:1, shuffle:false, repeat:'off', src:['Songs','آهنگ‌ها'], srcSub:['Recently added','تازه‌ترین'], vOff:74, vTotal:825, session:true, err:null},
    tm:{mode:'off', custom:'', lastValid:'', err:'', saveFailed:false, pending:null, draft:null, plusErr:false},
    clock: Date.UTC(2026,8,28,20,12,0), notice:null,
    ed:null, pick:null, search:{q:'',type:'all'}, occSeq:500, qSel:null, qHist:false,
    scen:{editFail:null}, lastRefresh:'23:02', meta:null,
  };
  return Object.assign(st, o);
}
const top = st => st.stack[st.stack.length-1];
const cur = st => st.pb.q[st.pb.idx];
const curSong = st => cur(st) ? K.byId[cur(st).id] : null;
const clockStr = (st, ms) => { const d = new Date(ms==null?st.clock:ms); return K.dg(`${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2,'0')}`, st.lang); };

/* visibility rules (proposal; see decision register D6/D7) */
const durVisible = (st,s) => s.d==null ? st.keepUnknown : (st.minDur===0 || s.d >= st.minDur);
const visible = (st,s) => !st.hidden.has(s.f) && durVisible(st,s);
function counts(st){
  /* Baseline 825 songs is the observed count with the shipped 30 s default already applied (flows.md).
     Simulation model: 9 short and 4 unknown-length files live in DariaValidation; all short files are hidden at the default. */
  const f = K.fById.DariaValidation, dvHidden = st.hidden.has('DariaValidation');
  let songs = 825 + f.short[30] - (dvHidden ? f.short[30] : (st.minDur ? f.short[st.minDur] : 0)) - (dvHidden || st.keepUnknown ? 0 : f.unknown);
  let albums = K.totals.albums, artists = K.totals.artists;
  K.folders.forEach(x=>{ if (!st.hidden.has(x.key)) return; songs -= x.n; albums -= x.albums; artists -= x.artists; });
  albums = Math.max(0, albums); artists = Math.max(0, artists);
  const hidden = (825 + f.short[30]) - songs;
  return {songs, albums, artists, hidden};
}
const shortHidden = st => { const f=K.fById.DariaValidation; if (st.hidden.has('DariaValidation')) return 0; return (st.minDur? f.short[st.minDur]:0) + (st.keepUnknown?0:f.unknown); };
const minLabel = (st,v) => v===0 ? tr(st,'off') : v===60 ? tr(st,'minute1') : v===120 ? tr(st,'minutes2') : tr(st,'sec',n(st,v));

function sortedSongs(st, list){
  const a = [...list];
  const {key,dir} = st.sort;
  if (key==='title') a.sort((x,y)=>x.t.localeCompare(y.t,'fa'));
  if (key==='artist') a.sort((x,y)=>(x.a||'~').localeCompare(y.a||'~','fa'));
  if (dir==='desc') a.reverse();
  return a;
}
const libSongs = st => sortedSongs(st, K.songs.filter(s=>visible(st,s)));

/* ---------------- small renderers ---------------- */
const L = (st,en,fa) => st.lang==='fa' && fa ? fa : en;
const artistOf = (st,s) => s.a ? s.a : tr(st,'unknownArtist');
function row(st, s, o={}){
  const isCur = curSong(st) && curSong(st).id===s.id && st.pb.session && !o.noCur;
  const miss = st.missing.has(s.id);
  const hid = o.markHidden && !visible(st,s);
  const badge = miss ? `<span class="badge e">${ic('file-x','xs')}${tr(st,'missing')}</span>` : hid ? `<span class="badge">${ic('eye-off','xs')}${tr(st,'inHidden')}</span>` : '';
  const sub = o.sub!=null ? o.sub : (st.sort.key==='artist'||true) ? artistOf(st,s) : '';
  const lead = o.check!=null ? `<span class="chk ${o.check?'on':''}" aria-hidden="true">${o.check?ic('check','xs'):''}</span>` : '';
  const trail = o.trail!=null ? o.trail : `<span class="du">${s.d==null?'—':tm(st,s.d)}</span><button class="ib" data-act="songMenu" data-arg="${s.id}" aria-label="${tr(st,'more')}: ${esc(s.t)}">${ic('ellipsis-vertical')}</button>`;
  return `<div class="row ${isCur?'cur':''} ${miss||hid?'dim':''}" ${o.role?`role="${o.role}"`:''}>
    ${lead}<button class="rowmain" style="display:flex;align-items:center;gap:12px;flex:1;min-width:0" data-act="${o.act||'playSong'}" data-arg="${o.arg||s.id}" ${o.ctx?`data-ctx="${o.ctx}"`:''} aria-label="${esc(s.t)}, ${esc(artistOf(st,s))}${isCur?', now playing':''}">
      ${K.cover(s,'',{dark:st.theme==='dark',playing:isCur?st.pb.playing:null})}
      <span class="tx"><span class="t1">${esc(s.t)}</span><span class="t2">${esc(sub)}</span>${badge}</span>
    </button>${trail}</div>`;
}
function banner(kind, icon, title, body, btn){
  return `<div class="banner ${kind}" role="status">${ic(icon,'s')}<div class="tx">${title?`<b>${title}</b>`:''}${body||''}${btn?`<div>${btn}</div>`:''}</div></div>`;
}
function appbar(st, title, o={}){
  return `<div class="ab">${o.back!==false?`<button class="ib" data-act="back" aria-label="${tr(st,'back')}">${ic('arrow-left','flip')}</button>`:''}<div class="t">${title}${o.sub?`<small>${o.sub}</small>`:''}</div>${o.actions||''}</div>`;
}

/* ---------------- dock ---------------- */
function mini(st){
  const s = curSong(st);
  if (!st.pb.session || !s) return '';
  const d = s.d;
  const pct = d ? Math.min(100, st.pb.pos/d*100) : 0;
  let sub = esc(artistOf(st,s));
  let tmr = '';
  if (st.tm.mode==='dur') tmr = `<span class="tm" aria-label="${tr(st,'timer')}: ${remMin(st)} min">${ic('moon','xs')}${n(st,remMin(st))}′</span>`;
  if (st.tm.mode==='eos') tmr = `<span class="tm" aria-label="${tr(st,'pausingAfter')}">${ic('moon','xs')}${L(st,'Song end','پایان آهنگ')}</span>`;
  if (st.notice==='timerDone') sub = tr(st,'pausedByTimer');
  if (st.pb.err) sub = tr(st,'missing');
  return `<div class="mini ${st.pb.err?'err':''}">
    <button class="open" data-act="openNp" aria-label="${L(st,'Open player','باز کردن پخش‌کننده')}: ${esc(s.t)}"></button>
    ${K.cover(s,'',{dark:st.theme==='dark'})}
    <div class="tx"><div class="t1">${esc(s.t)}</div><div class="t2">${tmr}<span style="overflow:hidden;text-overflow:ellipsis">${sub}</span></div></div>
    <button class="pp" data-act="toggle" aria-label="${st.pb.playing?tr(st,'pause'):tr(st,'play')}">${ic(st.pb.playing?'pause':'play','fill')}</button>
    <button class="ib" data-act="next" aria-label="${tr(st,'next')}">${ic('skip-forward','fill flip')}</button>
    ${d?`<div class="prog" aria-hidden="true"><i style="width:${pct}%"></i></div>`:''}
  </div>`;
}
const compactDock = st => st.scale>1.25 || st.w<=330;
function dock(st){
  const m = mini(st);
  const find = `<button class="find" data-act="openSearch" aria-label="${tr(st,'search')}">${ic('search','s')}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${tr(st,'search')}</span></button>`;
  if (st.perm!=='granted' || st.lib==='loading' || st.lib==='empty' || st.lib==='readError') return m?`<div class="dock">${m}<div style="height:2px"></div></div>`:'';
  if (compactDock(st) && m) return `<div class="dock"><div class="dock-row"><div style="flex:1;min-width:0">${m}</div><button class="ib" style="background:var(--s2)" data-act="openSearch" aria-label="${tr(st,'search')}">${ic('search')}</button></div><div style="height:2px"></div></div>`;
  return `<div class="dock">${m}${find}<div style="height:2px"></div></div>`;
}
const DOCK_PAD = st => `<div style="height:${st.pb.session && !compactDock(st) ? 150 : 96}px"></div>`;

/* ---------------- screens ---------------- */
function lensRow(st, lens){
  const L5 = ['songs','playlists','albums','artists','folders'];
  if (st.scale>1.25 || st.w<360) return `<div class="lens-pick"><button data-act="sheet" data-arg="lens" aria-haspopup="menu">${tr(st,lens)} ${ic('chevron-down','s')}</button></div>`;
  return `<div class="lens" role="tablist">${L5.map(l=>`<button role="tab" aria-selected="${l===lens}" data-act="lens" data-arg="${l}">${tr(st,l)}</button>`).join('')}</div>`;
}
function hiddenPill(st){
  const c = counts(st);
  const userSet = st.hidden.size>0 || st.minDur!==30 || !st.keepUnknown;
  return c.hidden>0 && userSet ? `<button class="pill warn" data-act="sheet" data-arg="why" aria-label="${tr(st,'hiddenPill',n(st,c.hidden))}. ${tr(st,'whyHidden')}">${ic('eye-off','xs')}${tr(st,'hiddenPill',n(st,c.hidden))}</button>` : '';
}
function libraryBanners(st){
  let b='';
  if (st.refreshFailed) b += banner('warn','triangle-alert',null,tr(st,'refreshFail',st.lastRefresh),`<button data-act="retryRefresh">${tr(st,'retry')}</button>`);
  return b;
}
function scrLibrary(st, v){
  st.meta = {id:{songs:'S01',playlists:'S02',albums:'S03',artists:'S04',folders:'S05'}[v.lens], name:`Library · ${v.lens}`, status:'redesigned'};
  const gate = gateScreen(st);
  const head = `<div class="ab" style="padding-inline-start:12px">${K.wordmark()}<button class="ib" data-act="push" data-arg="settings" aria-label="${tr(st,'settings')}">${ic('settings')}</button></div>`;
  if (gate) return head + gate + dock(st);
  const c = counts(st);
  let body='', meta='';
  if (v.lens==='songs'){
    const list = libSongs(st);
    const sortL = {added:tr(st,'sortAdded'),title:tr(st,'sortTitle'),artist:tr(st,'sortArtist')}[st.sort.key];
    meta = `<div class="meta-row"><span class="c">${tr(st,'nSongs',n(st,c.songs))}</span>${hiddenPill(st)}
      <button class="pill" data-act="sheet" data-arg="sort" aria-label="${tr(st,'sortBy')}: ${sortL}">${ic('arrow-up-down','xs')}${sortL}</button>
      <button class="ib" data-act="shuffleAll" aria-label="${tr(st,'shuffle')} ${tr(st,'songs')}">${ic('shuffle')}</button></div>`;
    body = c.songs===0 ? allHiddenState(st) : list.map(s=>row(st,s,{ctx:'lib'})).join('') + `<p class="explain" style="text-align:center;color:var(--ink3)">${L(st,`Prototype shows ${list.length} sample rows of ${c.songs}.`,`نمونهٔ ${n(st,list.length)} ردیف از ${n(st,c.songs)}.`)}</p>`;
  }
  if (v.lens==='playlists'){
    meta = `<div class="meta-row"><span class="c">${tr(st,'nSongs',n(st,st.playlists.length))}</span></div>`.replace(tr(st,'nSongs',n(st,st.playlists.length)), `${n(st,st.playlists.length)} ${L(st,'playlists','پلی‌لیست')} · ${n(st,4)} ${L(st,'automatic','خودکار')}`);
    body = `<div style="padding:4px 16px 8px"><button class="btn t" data-act="newPl" style="width:100%">${ic('plus','s')}${tr(st,'newPl')}</button></div>
      <div class="sec-h">${tr(st,'yourPl')}</div>
      ${st.playlists.map(p=>plRow(st,p)).join('')}
      <div class="sec-h">${tr(st,'auto')}</div>
      <div class="smart">${K.smart.map(m=>`<button data-act="openSmart" data-arg="${m.id}"><span class="ic">${ic(m.icon,'s')}</span><span><b>${L(st,m.name,m.fa)}</b><small>${tr(st,'nSongs',n(st,m.id==='fav'?st.fav.size:m.n))}</small></span></button>`).join('')}</div>`;
  }
  if (v.lens==='albums'){
    meta = `<div class="meta-row"><span class="c">${tr(st,'nAlbums',n(st,c.albums))}</span>${hiddenPill(st)}<button class="pill">${ic('arrow-up-down','xs')}${tr(st,'sortTitle')}</button></div>`;
    body = `<div class="grid2">${K.albums.filter(a=>!(a.id==='gah'&&st.hidden.has('QuickShare'))).map(a=>`<button class="card" data-act="openAlbum" data-arg="${a.id}" style="text-align:start">${K.cover(a,'',{dark:st.theme==='dark'})}<div class="t1">${esc(a.t)}</div><div class="t2">${esc(a.a)} · ${tr(st,'nSongs',n(st,a.n))}</div></button>`).join('')}</div>`;
  }
  if (v.lens==='artists'){
    meta = `<div class="meta-row"><span class="c">${tr(st,'nArtists',n(st,c.artists))}</span>${hiddenPill(st)}</div>`;
    body = K.artists.map(a=>`<div class="row"><button style="display:flex;gap:12px;align-items:center;flex:1;min-width:0" data-act="openArtist" data-arg="${a.id}">${K.cover({t:a.t},'round',{dark:st.theme==='dark'})}<span class="tx"><span class="t1">${esc(a.t)}</span><span class="t2">${tr(st,'nSongs',n(st,a.n))}</span></span></button>${ic(st.lang==='fa'?'chevron-left':'chevron-right')}<span style="width:12px"></span></div>`).join('');
  }
  if (v.lens==='folders'){
    const vis = K.folders.filter(f=>!st.hidden.has(f.key)), hid = K.folders.filter(f=>st.hidden.has(f.key));
    meta = `<div class="meta-row"><span class="c">${tr(st,'nFolders',n(st,vis.length))}</span>${hiddenPill(st)}</div>`;
    body = vis.map(f=>folderRow(st,f,false)).join('') + (hid.length?`<div class="sec-h">${ic('eye-off','xs')}${tr(st,'hiddenFolders')}</div>${hid.map(f=>folderRow(st,f,true)).join('')}<p class="explain">${tr(st,'foldersExplain')}</p>`:'');
  }
  return `${head}${libraryBanners(st)}${lensRow(st,v.lens)}${meta}<div class="scroll" data-scroll="lib-${v.lens}">${body}${DOCK_PAD(st)}</div>${dock(st)}`;
}
function allHiddenState(st){
  return `<div class="empty" style="padding-bottom:40px"><span class="ic">${ic('eye-off','l')}</span><h3>${tr(st,'allHiddenT')}</h3><p>${tr(st,'allHiddenB')}</p><button class="btn f" data-act="push" data-arg="settings-folders">${tr(st,'libSettings')}</button></div>`;
}
function plRow(st,p){
  const hiddenN = p.items.filter(id=>!visible(st,K.byId[id])).length;
  const first = K.byId[p.items[0]];
  return `<div class="row"><button style="display:flex;gap:12px;align-items:center;flex:1;min-width:0" data-act="openPl" data-arg="${p.id}">${first?K.cover(first,'',{dark:st.theme==='dark'}):K.cover({t:p.name},'',{dark:st.theme==='dark'})}<span class="tx"><span class="t1">${esc(p.name)}</span><span class="t2">${tr(st,'nSongs',n(st,p.n))}${hiddenN?` · ${tr(st,'hiddenPill',n(st,hiddenN))}`:''}</span></span></button><button class="ib" data-act="plMenu" data-arg="${p.id}" aria-label="${tr(st,'more')}: ${esc(p.name)}">${ic('ellipsis-vertical')}</button></div>`;
}
function folderRow(st,f,hidden){
  return `<div class="row ${hidden?'dim':''}"><button style="display:flex;gap:12px;align-items:center;flex:1;min-width:0" ${hidden?'':`data-act="openFolder" data-arg="${f.key}"`} ${hidden?'tabindex="-1"':''}><span class="cv" style="display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-ink)">${ic(hidden?'eye-off':'folder')}</span><span class="tx"><span class="t1">${esc(f.name)}</span><span class="t2">${tr(st,'nSongs',n(st,f.n))} · ${tm(st,f.dur)}</span><span class="t2">${esc(f.path)}</span></span></button>${hidden?`<button class="btn x" data-act="showFolder" data-arg="${f.key}">${tr(st,'show')}</button>`:`<button class="ib" data-act="folderMenu" data-arg="${f.key}" aria-label="${tr(st,'more')}: ${esc(f.name)}">${ic('ellipsis-vertical')}</button>`}</div>`;
}
function gateScreen(st){
  if (st.perm==='first') return `<div class="empty"><span class="ic">${ic('music','l')}</span><h3>${tr(st,'permT')}</h3><p>${tr(st,'permB')}</p><button class="btn f" data-act="askPerm">${tr(st,'allow')}</button></div>`;
  if (st.perm==='denied') return `<div class="empty"><span class="ic">${ic('lock','l')}</span><h3>${tr(st,'deniedT')}</h3><p>${tr(st,'deniedB')}</p><button class="btn f" data-act="askPerm">${tr(st,'allow')}</button></div>`;
  if (st.perm==='blocked') return `<div class="empty"><span class="ic">${ic('lock','l')}</span><h3>${tr(st,'blockedT')}</h3><p>${tr(st,'blockedB')}</p><div class="btns" style="justify-content:center"><button class="btn f" data-act="openAppSettings">${tr(st,'openSettings')}</button><button class="btn o" data-act="checkAgain">${tr(st,'checkAgain')}</button></div></div>`;
  if (st.lib==='loading') return `<div class="lens" aria-hidden="true">${['songs','playlists','albums','artists','folders'].map(l=>`<button>${tr(st,l)}</button>`).join('')}</div><div class="meta-row" role="status"><span class="c">${ic('loader-circle','xs spin')} ${tr(st,'loadingT')} ${n(st,312)}</span></div><div class="scroll">${Array.from({length:8}).map(()=>`<div class="row"><span class="cv" style="background:var(--s2)"></span><span class="tx" style="gap:8px"><span class="skel" style="width:60%"></span><span class="skel" style="width:40%;height:10px"></span></span></div>`).join('')}</div>`;
  if (st.lib==='empty') return `<div class="empty"><span class="ic">${ic('folder-open','l')}</span><h3>${tr(st,'emptyT')}</h3><p>${tr(st,'emptyB')}</p><button class="btn f" data-act="checkAgain">${tr(st,'checkAgain')}</button></div>`;
  if (st.lib==='readError') return `<div class="empty"><span class="ic" style="background:var(--danger-soft);color:var(--danger)">${ic('circle-alert','l')}</span><h3>${tr(st,'readErrT')}</h3><p>${tr(st,'readErrB')}</p><button class="btn f" data-act="checkAgain">${tr(st,'retry')}</button></div>`;
  return '';
}
function collItems(st, v){
  if (v.kind==='album'){ const a=K.albums.find(x=>x.id===v.key); return {title:a.t, sub:`${a.a} · ${tr(st,'nSongs',n(st,a.n))}`, item:a, items:K.songs.filter(s=>(s.al===a.t) && visible(st,s)), meta:'S06'}; }
  if (v.kind==='artist'){ const a=K.artists.find(x=>x.id===v.key); return {title:a.t, sub:tr(st,'nSongs',n(st,a.n)), item:{t:a.t}, items:K.songs.filter(s=>s.a===a.t && visible(st,s)), meta:'S06'}; }
  if (v.kind==='folder'){ const f=K.fById[v.key]; return {title:f.name, sub:`${tr(st,'nSongs',n(st,f.n))} · ${tm(st,f.dur)}`, item:{t:f.name}, items:K.songs.filter(s=>s.f===f.key && visible(st,s)), meta:'S06', folder:f}; }
  if (v.kind==='smart'){ const m=K.smart.find(x=>x.id===v.key); const ids = m.id==='fav'?[...st.fav]:K.songs.slice(0,8).map(s=>s.id); const all=ids.map(id=>K.byId[id]); return {title:L(st,m.name,m.fa), sub:tr(st,'nSongs',n(st,m.id==='fav'?st.fav.size:m.n)), item:{t:m.name}, items:all, smart:m, meta:'S06'}; }
}
function scrCollection(st, v){
  const c = collItems(st, v);
  st.meta = {id:c.meta, name:`Collection · ${v.kind}`, status:'redesigned'};
  const showHidden = v.showHidden;
  let items = c.items;
  let footer='';
  if (c.smart && c.smart.id==='fav'){
    const hid = items.filter(s=>!visible(st,s));
    if (!showHidden) items = items.filter(s=>visible(st,s));
    if (hid.length) footer = `<div class="row" style="padding-inline-end:12px"><span class="cv" style="display:grid;place-items:center;background:var(--warn-soft);color:var(--warn)">${ic('eye-off')}</span><span class="tx"><span class="t1">${tr(st,'hiddenInPl',n(st,hid.length))}</span></span><button class="btn x" data-act="toggleShowHidden">${showHidden?tr(st,'hideThese'):tr(st,'show')}</button></div>`;
  }
  const actions = `<button class="ib" data-act="collMenu" aria-label="${tr(st,'more')}">${ic('ellipsis-vertical')}</button>`;
  const cover = c.item ? K.cover(c.item,'xl',{dark:st.theme==='dark'}) : '';
  return `${appbar(st,'',{actions})}<div class="scroll" data-scroll="coll">
    <div class="coll">${cover}<div class="tx"><h2>${esc(c.title)}</h2><p>${c.sub}</p></div></div>
    <div class="btns" style="padding:0 16px 10px"><button class="btn f" data-act="playColl">${ic('play','s fill')}${tr(st,'play')}</button><button class="btn o" data-act="shuffleColl">${ic('shuffle','s')}${tr(st,'shuffle')}</button></div>
    ${items.map(s=>row(st,s,{ctx:'coll',markHidden:true})).join('')}${footer}${DOCK_PAD(st)}</div>${dock(st)}`;
}
function scrPlaylist(st, v){
  const p = st.playlists.find(x=>x.id===v.key);
  if (!p) return scrLibrary(st,{lens:'playlists'});
  st.meta = {id:'S07', name:'Playlist detail', status:'redesigned'};
  const vis = p.items.filter(id=>visible(st,K.byId[id]));
  const hid = p.items.filter(id=>!visible(st,K.byId[id]));
  const shown = v.showHidden ? p.items : vis;
  const first = K.byId[p.items[0]];
  const actions = `<button class="ib" data-act="openPicker" aria-label="${tr(st,'addSongs')}">${ic('plus')}</button><button class="ib" data-act="plMenu" data-arg="${p.id}" aria-label="${tr(st,'more')}">${ic('ellipsis-vertical')}</button>`;
  const body = p.items.length===0 ? `<div class="empty" style="padding-bottom:40px"><span class="ic">${ic('list-music','l')}</span><h3>${tr(st,'emptyPl')}</h3><p>${tr(st,'emptyPlB')}</p><button class="btn f" data-act="openPicker">${tr(st,'addSongs')}</button></div>`
  : shown.map((id,i)=>row(st,K.byId[id],{ctx:'pl',markHidden:true,trail:`<button class="ib" data-act="plItemMenu" data-arg="${i}" aria-label="${tr(st,'more')}">${ic('ellipsis-vertical')}</button><span class="drag" aria-hidden="true">${ic('grip-vertical')}</span>`})).join('')
    + (hid.length?`<div class="row" style="padding-inline-end:12px"><span class="cv" style="display:grid;place-items:center;background:var(--warn-soft);color:var(--warn)">${ic('eye-off')}</span><span class="tx"><span class="t1">${tr(st,'hiddenInPl',n(st,hid.length))}</span><span class="t2">${L(st,'They stay in this playlist.','در این پلی‌لیست می‌مانند.')}</span></span><button class="btn x" data-act="toggleShowHidden">${v.showHidden?tr(st,'hideThese'):tr(st,'show')}</button></div>`:'');
  return `${appbar(st,'',{actions})}<div class="scroll" data-scroll="pl">
    <div class="coll">${first?K.cover(first,'xl',{dark:st.theme==='dark'}):K.cover({t:p.name},'xl',{dark:st.theme==='dark'})}<div class="tx"><h2>${esc(p.name)}</h2><p>${tr(st,'nSongs',n(st,p.n))}${hid.length?` · ${tr(st,'hiddenPill',n(st,hid.length))}`:''}</p></div></div>
    ${p.items.length?`<div class="btns" style="padding:0 16px 10px"><button class="btn f" data-act="playPl">${ic('play','s fill')}${tr(st,'play')}</button><button class="btn o" data-act="shufflePl">${ic('shuffle','s')}${tr(st,'shuffle')}</button></div>`:''}
    ${body}${DOCK_PAD(st)}</div>${dock(st)}`;
}
function scrPicker(st, v){
  st.meta = {id:'S08', name:'Add songs to playlist', status:'retained'};
  const p = st.playlists.find(x=>x.id===v.key);
  const sel = st.pick || new Set();
  const list = K.songs.filter(s=>visible(st,s) && (!v.q || (s.t+' '+(s.a||'')).toLowerCase().includes(v.q.toLowerCase())));
  const cnt = sel.size;
  return `${appbar(st, esc(p.name), {sub:tr(st,'selectSongs')})}
  <div style="padding:0 16px 8px"><label class="find" style="background:var(--s2)">${ic('search','s')}<input id="pick-q" data-input="pickQ" value="${esc(v.q||'')}" placeholder="${tr(st,'search')}" aria-label="${tr(st,'search')}"></label></div>
  <div class="scroll" data-scroll="pick">${list.map(s=>{ const inPl = p.items.includes(s.id); return row(st,s,{act:'pickToggle',arg:s.id,check:sel.has(s.id),noCur:true,sub: inPl?tr(st,'plContains'):artistOf(st,s),trail:`<span class="du" style="padding-inline-end:16px">${s.d==null?'—':tm(st,s.d)}</span>`}); }).join('')}<div style="height:90px"></div></div>
  <div class="dock" style="padding-bottom:10px"><button class="btn f ${cnt?'':'dis'}" data-act="pickCommit" style="width:100%">${cnt===1?tr(st,'add1'):cnt?tr(st,'addN',n(st,cnt)):tr(st,'addSongs')}</button></div>`;
}
function scrSearch(st){
  st.meta = {id:'S09', name:'Search (global)', status:'redesigned'};
  const q = st.search.q;
  return `<div class="ab">${`<button class="ib" data-act="back" aria-label="${tr(st,'back')}">${ic('arrow-left','flip')}</button>`}<div class="t">${tr(st,'searchShort')}</div></div>
  <div class="lens" role="tablist">${['all','songs','albums','artists','playlists','folders'].map(t=>`<button role="tab" aria-selected="${st.search.type===t}" data-act="searchType" data-arg="${t}">${tr(st,t)}</button>`).join('')}</div>
  <div class="scroll" data-scroll="search" id="search-results">${searchResults(st)}</div>
  <div class="dock" style="padding-bottom:8px"><label class="find act">${ic('search','s')}<input id="search-q" data-input="searchQ" value="${esc(q)}" placeholder="${tr(st,'search')}" aria-label="${tr(st,'search')}" autocomplete="off">${q?`<button class="ib" style="width:36px;height:36px" data-act="clearSearch" aria-label="${L(st,'Clear search','پاک کردن')}">${ic('x','s')}</button>`:''}</label>
  ${st.kb?`<div style="height:200px;margin:4px -10px 0;background:var(--s3);display:grid;place-items:center;color:var(--ink3);font-size:12px">${tr(st,'kb')}</div>`:''}</div>`;
}
function searchResults(st){
  const q = st.search.q.trim().toLowerCase(), type = st.search.type;
  if (!q) {
    return `<div class="sec-h">${L(st,'Recent searches','جست‌وجوهای اخیر')}</div>${['Mahasti','Ebi','Night'].map(r=>`<div class="row"><button style="display:flex;gap:12px;align-items:center;flex:1" data-act="setQ" data-arg="${r}">${ic('history')}<span class="tx"><span class="t1">${r}</span></span></button><button class="ib" aria-label="${L(st,'Remove','حذف')} ${r}">${ic('x','s')}</button></div>`).join('')}<p class="explain">${tr(st,'noMatchB')}</p>`;
  }
  const m = s => (s.t+' '+(s.a||'')+' '+(s.al||'')).toLowerCase().includes(q);
  const songs = K.songs.filter(s=>m(s) && visible(st,s));
  const hiddenM = K.songs.filter(s=>m(s) && !visible(st,s) && st.hidden.has(s.f)).length;
  const albums = K.albums.filter(a=>(a.t+' '+a.a).toLowerCase().includes(q));
  const artists = K.artists.filter(a=>a.t.toLowerCase().includes(q));
  const pls = st.playlists.filter(p=>p.name.toLowerCase().includes(q));
  const fols = K.folders.filter(f=>f.name.toLowerCase().includes(q) && !st.hidden.has(f.key));
  let h='';
  const want = t => type==='all'||type===t;
  if (want('songs') && songs.length) h += `<div class="sec-h">${tr(st,'songs')}</div>${songs.slice(0,type==='all'?5:50).map(s=>row(st,s,{ctx:'search'})).join('')}`;
  if (want('albums') && albums.length) h += `<div class="sec-h">${tr(st,'albums')}</div>${albums.map(a=>`<div class="row"><button style="display:flex;gap:12px;align-items:center;flex:1;min-width:0" data-act="openAlbum" data-arg="${a.id}">${K.cover(a,'',{dark:st.theme==='dark'})}<span class="tx"><span class="t1">${esc(a.t)}</span><span class="t2">${esc(a.a)}</span></span></button></div>`).join('')}`;
  if (want('artists') && artists.length) h += `<div class="sec-h">${tr(st,'artists')}</div>${artists.map(a=>`<div class="row"><button style="display:flex;gap:12px;align-items:center;flex:1;min-width:0" data-act="openArtist" data-arg="${a.id}">${ic('user')}<span class="tx"><span class="t1">${esc(a.t)}</span><span class="t2">${tr(st,'nSongs',n(st,a.n))}</span></span></button></div>`).join('')}`;
  if (want('playlists') && pls.length) h += `<div class="sec-h">${tr(st,'playlists')}</div>${pls.map(p=>plRow(st,p)).join('')}`;
  if (want('folders') && fols.length) h += `<div class="sec-h">${tr(st,'folders')}</div>${fols.map(f=>folderRow(st,f,false)).join('')}`;
  const hid = hiddenM ? `<div class="banner info" style="margin-top:8px">${ic('eye-off','s')}<div class="tx"><b>${hiddenM===1?tr(st,'hiddenMatch1'):tr(st,'hiddenMatches',n(st,hiddenM))}</b><button data-act="push" data-arg="settings-folders">${tr(st,'reviewFolders')}</button></div></div>` : '';
  if (!h) return `<div class="empty" style="padding-bottom:20px"><span class="ic">${ic('search','l')}</span><h3 class="bdi">${tr(st,'noMatch',esc(st.search.q))}</h3><p>${tr(st,'noMatchB')}</p></div>${hid}`;
  return h + hid + '<div style="height:20px"></div>';
}

/* ---------------- now playing ---------------- */
function remMin(st){ return Math.max(0, Math.ceil((st.tm.end - st.clock)/60000)); }
function remSec(st){ return Math.max(0, Math.round((st.tm.end - st.clock)/1000)); }
function wave(st, s){
  const N = 56; let h=''; const d=s.d;
  const p = d ? st.pb.pos/d : 0;
  let seed = s.id.length*7;
  for (let i=0;i<N;i++){ seed=(seed*9301+49297)%233280; const v = .25 + (seed/233280)*.75*(0.6+0.4*Math.sin(i/5)); h += `<i class="${i/N<p?'p':''}" style="height:${Math.round(v*100)}%"></i>`; }
  return h + (d?`<span class="knob" style="left:${p*100}%"></span>`:'');
}
function npNotice(st){
  const s = curSong(st);
  if (st.pb.err) return `<div class="notice err">${ic('file-x')}<div class="tx"><b class="bdi">${tr(st,'cantPlay',esc(s.t))}</b>${tr(st,'cantPlayB')}<div class="btns" style="margin-top:6px"><button class="btn x" style="padding:0" data-act="next">${tr(st,'playNextSong')}</button><button class="btn x" data-act="removeCurQ">${tr(st,'removeQ')}</button></div></div></div>`;
  if (st.notice==='timerDone') return `<div class="notice">${ic('moon')}<div class="tx"><b>${tr(st,'pausedByTimer')}</b>${tr(st,'pausedByTimerB',clockStr(st,st.tm.firedAt))}</div><button class="ib" data-act="dismissNotice" aria-label="${tr(st,'dismiss')}">${ic('x','s')}</button></div>`;
  if (st.tm.mode==='dur' && remSec(st)<=5) return `<div class="notice info">${ic('moon')}<div class="tx">${tr(st,'fading')}</div></div>`;
  return '';
}
function timerChip(st){
  let label = tr(st,'timer'), on=false, ring='';
  if (st.tm.mode==='dur'){ on=true; const r=remSec(st), tot=st.tm.total||1800; label = `${n(st,Math.ceil(r/60))} ${tr(st,'min')}`; const frac=Math.max(0,Math.min(1,r/tot)); const C=2*Math.PI*11; ring=`<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" style="position:absolute"><circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="2.4"/><circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-frac)}" transform="rotate(-90 14 14)" stroke-linecap="round"/></svg>`; }
  if (st.tm.mode==='eos'){ on=true; label = L(st,'After this song','پس از این آهنگ'); }
  return `<button class="act ${on?'on':''}" data-act="sheet" data-arg="timer" aria-label="${tr(st,'timer')}${on?': '+label:': '+L(st,'off','خاموش')}"><span class="ring" style="width:28px;height:28px">${ring}${ic('moon','s')}</span>${label}</button>`;
}
function scrNowPlaying(st){
  const s = curSong(st); if (!s) return '';
  const face = st.np.face;
  st.meta = {id: face==='lyrics'?'S11':face==='queue'?'S12':'S10', name:`Now Playing · ${face}`, status: face==='lyrics'?'future':'redesigned'};
  const dark = st.theme==='dark';
  const [a,b] = K.tintOf(s);
  const tint = dark ? b : a;
  const qN = st.pb.q.length - st.pb.idx - 1 + (st.pb.vTotal - st.pb.q.length - st.pb.vOff);
  const hasLyr = lyricsOf(st,s);
  const faces = `<div class="faces" role="tablist" aria-label="${L(st,'Player view','نمای پخش‌کننده')}">
    <button role="tab" aria-selected="${face==='cover'}" data-act="face" data-arg="cover" aria-label="${tr(st,'faceCover')}">${ic('disc-3','s')}<span class="fl">${tr(st,'faceCover')}</span></button>
    <button role="tab" aria-selected="${face==='lyrics'}" data-act="face" data-arg="lyrics" aria-label="${tr(st,'faceLyrics')}">${ic('scroll-text','s')}<span class="fl">${tr(st,'faceLyrics')}</span></button>
    <button role="tab" aria-selected="${face==='queue'}" data-act="face" data-arg="queue" aria-label="${tr(st,'faceQueue')}: ${n(st,qN)}">${ic('list-music','s')}<span class="fl">${tr(st,'faceQueue')}</span><span class="ct">${n(st,qN)}</span></button></div>`;
  const title = `<div class="np-title"><div class="tx"><h3>${esc(s.t)}</h3><p>${esc(artistOf(st,s))}</p></div><button class="ib fav ${st.fav.has(s.id)?'on':''}" data-act="fav" data-arg="${s.id}" aria-pressed="${st.fav.has(s.id)}" aria-label="${tr(st,'fav')}">${ic('heart',st.fav.has(s.id)?'fill':'')}</button></div>`;
  let mid='';
  if (face==='cover') mid = `<div class="np-face"><div class="np-art">${K.cover(s,'',{dark,label:L(st,'Cover art','کاور')+': '+s.t})}</div></div>${title}`;
  if (face==='lyrics') mid = lyricsFace(st,s) + title;
  if (face==='queue') mid = queueFace(st);
  const src = L(st, st.pb.src[0], st.pb.src[1]);
  const tlUnknown = s.d==null;
  const land = st.land;
  const timeline = `<div class="tl ${tlUnknown?'unk':''}" role="slider" aria-label="${L(st,'Seek','جابه‌جایی')}" aria-valuemin="0" aria-valuemax="${s.d||0}" aria-valuenow="${st.pb.pos}" aria-valuetext="${tm(st,st.pb.pos)} ${L(st,'of','از')} ${tm(st,s.d)}" ${tlUnknown?'aria-disabled="true"':''} tabindex="0"><div class="wave" data-act="seek">${wave(st,s)}</div><div class="times"><span>${tm(st,st.pb.pos)}</span><span>${tlUnknown?tr(st,'unknownLen'):tm(st,s.d)}</span></div></div>`;
  const transport = `<div class="transport">
    <button class="ib ${st.pb.shuffle?'on':''}" data-act="shuffleT" aria-pressed="${st.pb.shuffle}" aria-label="${tr(st,'shuffle')}">${ic('shuffle')}</button>
    <button class="ib" data-act="prev" aria-label="${tr(st,'prev')}">${ic('skip-back','l fill')}</button>
    <button class="big" data-act="toggle" aria-label="${st.pb.playing?tr(st,'pause'):tr(st,'play')}">${ic(st.pb.playing?'pause':'play','l fill')}</button>
    <button class="ib" data-act="next" aria-label="${tr(st,'next')}">${ic('skip-forward','l fill')}</button>
    <button class="ib ${st.pb.repeat!=='off'?'on':''}" data-act="repeat" aria-label="${tr(st,{off:'repeatOff',all:'repeatAll',one:'repeatOne'}[st.pb.repeat])}">${ic(st.pb.repeat==='one'?'repeat-1':'repeat')}</button></div>`;
  const acts = `<div class="np-actions">${timerChip(st)}<button class="act" data-act="sheet" data-arg="addpl" aria-label="${tr(st,'addPl')}">${ic('list-plus','s')}${tr(st,'addPl')}</button></div>`;
  const bar = `<div class="ab"><button class="ib" data-act="collapse" aria-label="${tr(st,'collapse')}">${ic('chevron-down')}</button><button class="t" data-act="goSource" style="text-align:center">${tr(st,'playingFrom','')}<b>${esc(src)} · ${esc(L(st,st.pb.srcSub[0],st.pb.srcSub[1]))}</b></button><button class="ib" data-act="sheet" data-arg="npMenu" aria-label="${tr(st,'more')}">${ic('ellipsis-vertical')}</button></div>`;
  if (land) {
    return `<div class="np" style="--tint:${tint}">${bar}<div class="land-np">${K.cover(s,'',{dark})}<div style="display:flex;flex-direction:column;min-width:0;gap:4px">${npNotice(st)}${title.replace('padding:8px 24px 0','')}${timeline}${transport}<div class="np-actions">${timerChip(st)}<button class="act" data-act="face" data-arg="queue">${ic('list-music','s')}${tr(st,'faceQueue')}</button><button class="act" data-act="face" data-arg="lyrics" aria-label="${tr(st,'faceLyrics')}">${ic('scroll-text','s')}<span class="fl">${tr(st,'faceLyrics')}</span></button><button class="act">${ic('list-plus','s')}${tr(st,'addPl')}</button></div></div></div></div>`;
  }
  return `<div class="np ${st.np.enter?'anim-up':''}" style="--tint:${tint}">${bar}${npNotice(st)}${faces}${mid}${timeline}${transport}${acts}</div>`;
}
function lyricsOf(st,s){ if (K.lyrics[s.id]) return K.lyrics[s.id]; if (st.lyrImported.has(s.id)) return {kind:'plain', src:L(st,'Lyrics file added by you · illustrative','فایل متنی که افزودید'), lines:['(Imported lyrics text appears here.)','(متن واردشده اینجا نمایش داده می‌شود.)']}; return null; }
function lyricsFace(st,s){
  const ly = lyricsOf(st,s);
  if (!ly) return `<div class="np-face"><div class="empty" style="padding:10px 8px"><span class="ic">${ic('scroll-text','l')}</span><h3>${tr(st,'lyrNone')}</h3><p>${tr(st,'lyrNoneB')}</p><button class="btn t" data-act="importLyrics">${ic('import','s')}${tr(st,'lyrImport')}</button></div></div>`;
  if (ly.kind==='plain') return `<div class="lyr plain" tabindex="0" aria-label="${tr(st,'faceLyrics')}"><div class="src">${esc(ly.src)} · ${tr(st,'lyrPlain')}</div>${ly.lines.map(l=>`<p>${esc(l)||'&nbsp;'}</p>`).join('')}</div>`;
  let curI = 0; ly.lines.forEach((l,i)=>{ if (st.pb.pos>=l[0]) curI=i; });
  return `<div class="lyr" tabindex="0" aria-label="${tr(st,'faceLyrics')}" data-scroll="lyr" data-cur="${curI}"><div class="src">${esc(ly.src)}</div>${ly.lines.map((l,i)=>`<p class="${i===curI?'now':''}" data-act="seekTo" data-arg="${l[0]}" ${i===curI?'aria-current="true"':''}>${esc(l[1])}</p>`).join('')}</div>`;
}
function queueFace(st){
  const s = curSong(st), pos = st.pb.idx + 1 + st.pb.vOff;
  const sel = st.qSel;
  const up = st.pb.q.slice(st.pb.idx+1);
  const hist = st.pb.q.slice(Math.max(0,st.pb.idx-3), st.pb.idx);
  const extra = st.pb.vTotal - st.pb.q.length - st.pb.vOff;
  const hdrBtns = sel ? `<button class="btn x" data-act="qSelCancel">${tr(st,'cancel')}</button>` : `<button class="btn x" data-act="qSelect">${tr(st,'select')}</button><button class="ib" data-act="sheet" data-arg="qMenu" aria-label="${tr(st,'more')}">${ic('ellipsis-vertical')}</button>`;
  const qrow = (o,i) => { const song=K.byId[o.id]; const on = sel && sel.has(o.occ);
    return row(st, song, {noCur:true, act: sel?'qSelToggle':'qJump', arg:o.occ, check: sel?on:null, markHidden:true,
      trail: sel? '' : `<button class="ib" data-act="qItemMenu" data-arg="${o.occ}" aria-label="${tr(st,'more')}: ${esc(song.t)}">${ic('ellipsis-vertical')}</button><span class="drag" aria-hidden="true">${ic('grip-vertical')}</span>`}); };
  return `<div class="qhead">${K.cover(s,'m',{dark:st.theme==='dark',playing:st.pb.playing})}<div class="tx"><div class="t1">${esc(s.t)}</div><div class="t2">${tr(st,'ofN',n(st,pos),n(st,st.pb.vTotal))} · ${esc(L(st,st.pb.src[0],st.pb.src[1]))}</div></div>${hdrBtns}</div>
  <div class="qlist" data-scroll="q">
    <button class="mi" data-act="qHist" style="min-height:44px">${ic(st.qHist?'chevron-up':'history','s')}<span class="tx" style="color:var(--ink3);font-size:13px">${tr(st,'earlier',n(st,pos-1))}</span></button>
    ${st.qHist?hist.map((o,i)=>qrow(o,i)).join(''):''}
    <div class="sec-h">${tr(st,'upNext')}<span class="sp"></span></div>
    ${up.map((o,i)=>qrow(o,i)).join('')}
    ${extra>0?`<p class="explain" style="text-align:center;color:var(--ink3)">+ ${n(st,extra)} ${L(st,'more in this queue (not simulated)','مورد دیگر (شبیه‌سازی نشده)')}</p>`:''}
    <div style="height:10px"></div></div>
  ${sel?`<div class="btns" style="padding:8px 16px;justify-content:space-between"><span style="color:var(--ink2)">${n(st,sel.size)} ${L(st,'selected','انتخاب')}</span><button class="btn df ${sel.size?'':'dis'}" data-act="qRemoveSel">${ic('trash-2','s')}${tr(st,'removeN',n(st,sel.size))}</button></div>`:''}`;
}

/* ---------------- song info / editor ---------------- */
function scrInfo(st, v){
  const s = K.byId[v.key];
  st.meta = {id:'S16', name:'Song info', status:'redesigned'};
  const editable = s.fmt==='MP3';
  const kv = (k,val,src) => `<div style="padding:8px 16px"><div style="font-size:12.5px;color:var(--ink3);font-weight:600">${k}</div><div class="bdi" style="font-size:calc(15.5px*var(--fs))">${val}</div>${src?`<div style="font-size:12px;color:var(--ink3)">${src}</div>`:''}</div>`;
  const ly = lyricsOf(st,s);
  const pending = v.pending ? `<div class="banner info">${ic('refresh-cw','s')}<div class="tx">${tr(st,'idxPending')}</div></div>` : '';
  const vals = v.saved || {};
  return `${appbar(st,tr(st,'infoTitle'))}<div class="scroll" data-scroll="info">
  <div class="coll" style="align-items:center">${K.cover(s,'xl',{dark:st.theme==='dark'})}<div class="tx"><h2>${esc(vals.t||s.t)}</h2><p class="bdi">${esc(vals.a||artistOf(st,s))}</p><p>${s.fmt} · ${esc(K.fById[s.f].name)}</p></div></div>
  <div class="btns" style="padding:0 16px 6px"><button class="btn f ${editable?'':'dis'}" data-act="edit" data-arg="${s.id}" ${editable?'':'aria-disabled="true"'}>${ic('pencil','s')}${tr(st,'editTags')}</button><button class="btn o" data-act="share" data-arg="${s.id}">${ic('share-2','s')}${tr(st,'share')}</button></div>
  ${editable?'':`<p class="explain">${ic('info','xs')} ${tr(st,'editNA',s.fmt)}</p>`}
  ${pending}
  <div class="sec-h">${s.fileTitle?tr(st,'secIndex'):tr(st,'secTags',s.tagv||'ID3v2.4')}</div>
  <div class="set" style="padding:4px 0">
    ${kv(tr(st,'title'),esc(vals.t||s.t), s.fileTitle?tr(st,'titleFromFile'):'')}
    ${kv(tr(st,'artist'),s.a?esc(vals.a||s.a):`<span style="color:var(--ink3)">${L(st,'Not in this file','در فایل نیست')}</span>`)}
    ${kv(tr(st,'album'),esc(s.al||'—'))}
    ${s.year?kv(tr(st,'year'),K.dg(s.year,st.lang)):''}
    ${kv(tr(st,'cover'),s.art!=null?'JPEG · 75.55 kB':`<span style="color:var(--ink3)">${L(st,'No embedded cover · Daria tile shown','کاور ندارد · کاشی داریا')}</span>`)}
    ${kv(tr(st,'notInFile'), [tr(st,'albumArtist'),tr(st,'track'),tr(st,'disc'),tr(st,'genre')].join(', '))}
  </div>
  <div class="sec-h">${tr(st,'secLyr')}</div><div class="set">${`<button class="it" data-act="openLyrics">${ic('scroll-text')}<span class="tx"><b>${ly?(ly.kind==='synced'?tr(st,'lyrSynced'):tr(st,'lyrPlainIn')):tr(st,'lyrNoneRow')}</b><small>${ly?esc(ly.src):tr(st,'lyrNoneB')}</small></span></button>`}</div>
  <div class="sec-h">${tr(st,'secFile')}</div><div class="set" style="padding:4px 0">
    ${kv(tr(st,'fileName'),esc(s.file||(s.t+'.'+s.fmt.toLowerCase())))}${kv(tr(st,'location'),esc(K.fById[s.f].path))}${kv(tr(st,'format'),s.fmt==='MP3'?'MP3 (audio/mpeg)':s.fmt)}${kv(tr(st,'size'),((s.kb||5000)/1024).toFixed(2)+' MB')}${kv(tr(st,'modified'),s.mod||'—')}${kv(tr(st,'addedOn'),s.added||'—')}</div>
  <div class="sec-h">${tr(st,'secAudio')}</div><div class="set" style="padding:4px 0">${kv(tr(st,'length'),s.d==null?tr(st,'unknownLen'):tm(st,s.d))}${kv(tr(st,'bitrate'),s.bitrate||'—')}${kv(tr(st,'rate'),s.rate||'—')}${kv(tr(st,'channels'),s.ch||'—')}</div>
  ${DOCK_PAD(st)}</div>${dock(st)}`;
}
const FIELDS = ['t','a','al','aa','y','tr','g'];
const FLABEL = {t:'title',a:'artist',al:'album',aa:'albumArtist',y:'year',tr:'track',g:'genre'};
function normDigits(v){ return String(v).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)); }
function validate(k,v){ const x=normDigits(v).trim(); if (!x) return null; if (k==='y' && !/^\d{4}$/.test(x)) return 'yearErr'; if (k==='tr' && !/^\d{1,3}(\/\d{1,3})?$/.test(x)) return 'trackErr'; return null; }
function scrEditor(st){
  const e = st.ed, s = K.byId[e.id];
  st.meta = {id:'S17', name:'Tag editor', status:'redesigned'};
  const dirty = FIELDS.some(k=>e.v[k]!==e.o[k]) || e.cover!=='keep';
  const errs = FIELDS.map(k=>validate(k,e.v[k])).filter(Boolean);
  const isCur = curSong(st) && curSong(st).id===s.id;
  const fld = k => { const ch = e.v[k]!==e.o[k], er = validate(k,e.v[k]); const nd = normDigits(e.v[k]); const norm = (k==='y'||k==='tr') && nd!==e.v[k] && !er;
    return `<div class="fld"><label for="ed-${k}">${tr(st,FLABEL[k])}${ch?` · <span style="color:var(--accent-ink)">${tr(st,'changed')}</span>`:''}</label><div class="in ${er?'err':ch?'chg':''}"><input id="ed-${k}" data-input="ed" data-k="${k}" value="${esc(e.v[k])}" ${k==='y'||k==='tr'?'inputmode="numeric"':''} dir="auto"></div>
    ${er?`<div class="hint err">${tr(st,er)}</div>`:norm?`<div class="hint chg">${tr(st,'normalized',nd)}</div>`:ch&&!e.v[k]&&e.o[k]?`<div class="hint">${tr(st,'emptyRemoves')}</div>`:''}</div>`; };
  const coverPrev = e.cover==='keep' ? K.cover(s,'xl',{dark:st.theme==='dark'}) : e.cover==='new' ? `<span class="cv xl" style="background-image:${K.bgAttr(K.artURI(7))}"></span>` : `<span class="cv xl" style="background-image:${K.bgAttr(K.tileURI(s.al||s.t,st.theme==='dark'))};outline:2px dashed var(--danger);outline-offset:2px"></span>`;
  let alert='';
  if (e.status==='denied') alert = banner('err','lock',null,tr(st,'denied'),`<button data-act="saveEdit">${tr(st,'tryAgain')}</button>`);
  if (e.status==='ext') alert = banner('warn','triangle-alert',null,tr(st,'extChanged'),`<button data-act="reloadTags">${tr(st,'reload')}</button>`);
  if (e.status==='writeFail') alert = banner('err','circle-alert',null,tr(st,'writeFail'),`<button data-act="restoreOrig">${tr(st,'restore')}</button> · <button data-act="saveEdit">${tr(st,'tryAgain')}</button>`);
  if (e.status==='space') alert = banner('err','hard-drive',null,tr(st,'noSpace','12 MB'),`<button data-act="saveEdit">${tr(st,'tryAgain')}</button>`);
  const saving = e.status==='saving';
  return `<div class="ab"><button class="ib" data-act="back" aria-label="${L(st,'Close editor','بستن ویرایشگر')}">${ic('x')}</button><div class="t">${tr(st,'edTitle')}<small class="bdi">${esc(s.file||s.t)}</small></div><button class="btn f ${dirty&&!errs.length&&!saving?'':'dis'}" data-act="saveEdit">${saving?ic('loader-circle','s spin')+tr(st,'saving'):tr(st,'save')}</button><span style="width:8px"></span></div>
  ${alert}
  <div class="scroll" data-scroll="ed">
   <div style="display:flex;gap:14px;padding:4px 16px 14px;align-items:center">${coverPrev}<div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:600;color:var(--ink2);margin-bottom:6px">${tr(st,'cover')} · ${e.cover==='keep'?tr(st,'coverKeep'):e.cover==='new'?tr(st,'coverNew'):tr(st,'coverRemove')}</div>
   <div class="seg" style="margin:0" role="group" aria-label="${tr(st,'cover')}"><button aria-pressed="${e.cover==='keep'}" data-act="coverMode" data-arg="keep">${tr(st,'keep')}</button><button aria-pressed="${e.cover==='new'}" data-act="coverMode" data-arg="new">${tr(st,'changeCover')}</button><button aria-pressed="${e.cover==='remove'}" data-act="coverMode" data-arg="remove">${tr(st,'remove')}</button></div></div></div>
   ${FIELDS.map(fld).join('')}
   <div class="fld"><label>${tr(st,'disc')}</label><div class="in" style="background:var(--s2);color:var(--ink3)">— · ${L(st,'Shown in Song info; not editable yet','در اطلاعات آهنگ نمایش داده می‌شود؛ فعلاً قابل ویرایش نیست')}</div></div>
   <div style="height:150px"></div></div>
  <div class="dock" style="padding:10px 16px 12px;gap:6px">
    ${isCur?`<div style="font-size:13px;color:var(--ink2);display:flex;gap:8px">${ic('audio-lines','s')}<span>${st.pb.playing?tr(st,'edPlaying'):tr(st,'edCurrent')}</span></div>`:''}
    <div style="font-size:13px;color:var(--ink2);display:flex;gap:8px">${ic('file-audio','s')}<span class="bdi">${tr(st,'edWrites',esc(s.file||s.t))}</span></div></div>`;
}

/* ---------------- settings ---------------- */
function scrSettings(st){
  st.meta = {id:'S19', name:'Settings', status:'future'};
  const hidF = [...st.hidden]; const hs = hidF.reduce((a,k)=>a+K.fById[k].n,0);
  return `${appbar(st,tr(st,'settings'))}<div class="scroll" data-scroll="set">
  <div class="sec-h">${tr(st,'setLib')}</div>
  <div class="set">
    <button class="it" data-act="push" data-arg="settings-folders">${ic('folder')}<span class="tx"><b>${tr(st,'setFolders')}</b><small>${hidF.length?tr(st,'nHiddenF',n(st,hidF.length),n(st,hs)):tr(st,'allShown')}</small></span>${ic(st.lang==='fa'?'chevron-left':'chevron-right','s')}</button>
    <button class="it" data-act="push" data-arg="settings-duration">${ic('timer')}<span class="tx"><b>${tr(st,'setMin')}</b><small>${minLabel(st,st.minDur)} · ${shortHidden(st)?tr(st,'hides',n(st,shortHidden(st))):tr(st,'hidesNone')}</small></span>${ic(st.lang==='fa'?'chevron-left':'chevron-right','s')}</button>
    <div class="it">${ic('refresh-cw')}<span class="tx"><b>${tr(st,'setRefresh')}</b><small>${st.observeOff?tr(st,'autoOff'):tr(st,'autoOn',st.lastRefresh)}</small></span><button class="btn o" data-act="refreshNow">${st.refreshing?ic('loader-circle','s spin'):tr(st,'refreshNow')}</button></div>
  </div>
  <div class="sec-h">${tr(st,'setAppearance')}</div>
  <div class="set" style="padding:12px 0"><div class="seg" role="radiogroup" aria-label="${tr(st,'setAppearance')}">${['system','light','dark'].map(m=>`<button role="radio" aria-pressed="${(st.appearance||'system')===m}" aria-checked="${(st.appearance||'system')===m}" data-act="appearance" data-arg="${m}">${ic(m==='system'?'smartphone':m==='light'?'sun':'moon','s')}${tr(st,m==='system'?'sys':m)}</button>`).join('')}</div></div>
  <div class="sec-h">${tr(st,'setLyr')}</div>
  <div class="set"><div class="it" style="opacity:.7">${ic('scroll-text')}<span class="tx"><b>${tr(st,'lyrFolder')}</b><small>${tr(st,'notConnected')}</small></span></div></div>
  <div class="sec-h">${tr(st,'about')}</div>
  <div class="set"><div class="it">${ic('info')}<span class="tx"><b>Daria Music</b><small>${K.dg('7.1.0.0',st.lang)} · ${L(st,'Licenses','مجوزها')}</small></span></div></div>
  ${DOCK_PAD(st)}</div>${dock(st)}`;
}
function scrSetFolders(st){
  st.meta = {id:'S20', name:'Settings · Folders', status:'future'};
  return `${appbar(st,tr(st,'setFolders'))}<div class="scroll" data-scroll="setf"><p class="explain">${tr(st,'foldersExplain')}</p>
  <div class="set">${K.folders.map(f=>{ const on=!st.hidden.has(f.key); return `<button class="it" role="switch" aria-checked="${on}" data-act="toggleFolder" data-arg="${f.key}">${ic(on?'folder':'eye-off')}<span class="tx"><b>${esc(f.name)}</b><small>${esc(f.path)}</small><small>${tr(st,'nSongs',n(st,f.n))} · ${tm(st,f.dur)}</small></span><span class="sw ${on?'on':''}" aria-hidden="true"></span></button>`; }).join('')}</div>
  <p class="explain">${L(st,'Folder list comes from Android’s media index. A folder with no audio files is not listed.','فهرست پوشه‌ها از فهرست رسانهٔ اندروید می‌آید.')}</p>${DOCK_PAD(st)}</div>${dock(st)}`;
}
function scrSetDuration(st, v){
  st.meta = {id:'S21', name:'Settings · Minimum length', status:'future'};
  const f = K.fById.DariaValidation; const dvHidden = st.hidden.has('DariaValidation');
  const opts = [0,15,30,60,120];
  const hidesFor = x => dvHidden ? 0 : (x? f.short[x]:0);
  const rev = v.review ? `<div class="set">${K.songs.filter(s=>s.short).map(s=>`<div class="it">${ic('music')}<span class="tx"><b class="bdi">${esc(s.t)}</b><small>${tm(st,s.d)} · ${esc(K.fById[s.f].name)}</small></span></div>`).join('')}<div class="it"><span class="tx"><small>${L(st,`+ ${hidesFor(st.minDur)-1} more (simulated). Read-only: songs can’t be played from this list.`,'+ موارد دیگر (شبیه‌سازی). فقط‌خواندنی.')}</small></span></div></div>` : '';
  return `${appbar(st,tr(st,'setMin'))}<div class="scroll" data-scroll="setd"><p class="explain">${tr(st,'minExplain')}</p>
  <div class="set" role="radiogroup">${opts.map(x=>`<button class="it" role="radio" aria-checked="${st.minDur===x}" data-act="setMin" data-arg="${x}"><span class="rad ${st.minDur===x?'on':''}"></span><span class="tx"><b>${minLabel(st,x)}${x===30?` · ${L(st,'default','پیش‌فرض')}`:''}</b></span><span class="cnt">${hidesFor(x)?tr(st,'hides',n(st,hidesFor(x))):tr(st,'hidesNone')}</span></button>`).join('')}</div>
  <div class="set"><button class="it" role="switch" aria-checked="${st.keepUnknown}" data-act="toggleUnknown"><span class="tx"><b>${tr(st,'keepUnknown')}</b><small>${tr(st,'keepUnknownB',n(st,f.unknown))}</small></span><span class="sw ${st.keepUnknown?'on':''}" aria-hidden="true"></span></button></div>
  ${st.minDur?`<div class="set"><button class="it" data-act="reviewShort">${ic(v.review?'chevron-up':'eye')}<span class="tx"><b>${tr(st,'reviewHidden')}</b><small>${tr(st,'hides',n(st,hidesFor(st.minDur)))}</small></span></button></div>${rev}`:''}
  <p class="explain" style="color:var(--ink3)">${L(st,'Counts are simulated for this prototype.','شمارش‌ها شبیه‌سازی است.')}</p>${DOCK_PAD(st)}</div>${dock(st)}`;
}

/* ---------------- sheets & dialogs ---------------- */
function sheetHtml(st){
  const sh = st.sheet; if (!sh) return '';
  let head='', body='';
  const s = sh.song ? K.byId[sh.song] : curSong(st);
  const song = s;
  if (sh.type==='song'){
    st.meta2 = 'S13';
    head = `<div class="sh">${K.cover(s,'m',{dark:st.theme==='dark'})}<div class="tx"><h4>${esc(s.t)}</h4><p>${esc(artistOf(st,s))}</p></div><button class="ib fav ${st.fav.has(s.id)?'on':''}" style="${st.fav.has(s.id)?'color:var(--danger)':''}" data-act="fav" data-arg="${s.id}" aria-pressed="${st.fav.has(s.id)}" aria-label="${tr(st,'fav')}">${ic('heart',st.fav.has(s.id)?'fill':'')}</button></div>`;
    body = `<div class="mgrp">${tr(st,'grpSession')}</div>
      <button class="mi" data-act="playSong" data-arg="${s.id}" data-ctx="${sh.ctx||'lib'}">${ic('play')}${tr(st,'playNow')}</button>
      <button class="mi" data-act="playNext" data-arg="${s.id}">${ic('list-start')}${tr(st,'playNext')}</button>
      <button class="mi" data-act="addQueue" data-arg="${s.id}">${ic('list-end')}${tr(st,'addQueue')}</button>
      <div class="mgrp">${tr(st,'grpKeep')}</div>
      <button class="mi" data-act="sheet" data-arg="addpl" data-song="${s.id}">${ic('list-plus')}<span class="tx">${tr(st,'addPl')}…</span></button>
      <div class="mgrp">${tr(st,'grpGo')}</div>
      <button class="mi" data-act="goAlbum" data-arg="${s.id}">${ic('disc-3')}<span class="tx">${tr(st,'goAlbum')}<small class="bdi">${esc(s.al||'—')}</small></span></button>
      <button class="mi" data-act="goArtist" data-arg="${s.id}">${ic('user')}<span class="tx">${tr(st,'goArtist')}<small class="bdi">${esc(artistOf(st,s))}</small></span></button>
      <div class="mgrp">${tr(st,'grpFile')}</div>
      <button class="mi" data-act="info" data-arg="${s.id}">${ic('info')}${tr(st,'info')}</button>
      <button class="mi" data-act="share" data-arg="${s.id}">${ic('share-2')}${tr(st,'share')}</button>`;
  }
  if (sh.type==='npMenu'){
    head = `<div class="sh">${K.cover(s,'m',{dark:st.theme==='dark'})}<div class="tx"><h4>${esc(s.t)}</h4><p>${esc(artistOf(st,s))}</p></div></div>`;
    body = `<button class="mi" data-act="goAlbum" data-arg="${s.id}">${ic('disc-3')}<span class="tx">${tr(st,'goAlbum')}<small>${esc(s.al||'—')}</small></span></button>
      <button class="mi" data-act="goArtist" data-arg="${s.id}">${ic('user')}<span class="tx">${tr(st,'goArtist')}<small>${esc(artistOf(st,s))}</small></span></button>
      <button class="mi" data-act="goFolder" data-arg="${s.f}">${ic('folder')}<span class="tx">${tr(st,'goFolder')}<small>${esc(K.fById[s.f].name)}</small></span></button>
      <div class="hr"></div>
      <button class="mi" data-act="info" data-arg="${s.id}">${ic('info')}${tr(st,'info')}</button>
      <button class="mi" data-act="share" data-arg="${s.id}">${ic('share-2')}${tr(st,'share')}</button>`;
  }
  if (sh.type==='addpl'){
    st.meta2='S14';
    head = `<div class="sh"><div class="tx"><h4 class="bdi">${tr(st,'plAddSheet',esc(s.t))}</h4></div></div>`;
    body = `<button class="mi" data-act="fav" data-arg="${s.id}" role="switch" aria-checked="${st.fav.has(s.id)}">${ic('heart',st.fav.has(s.id)?'fill':'')}<span class="tx">${L(st,'Favourites','علاقه‌مندی‌ها')}<small>${st.fav.has(s.id)?L(st,'In Favourites · tap to remove','در علاقه‌مندی‌ها'):L(st,'Tap to add','برای افزودن بزنید')}</small></span><span class="sw ${st.fav.has(s.id)?'on':''}" aria-hidden="true"></span></button>
      <div class="hr"></div>
      <button class="mi" data-act="newPl" data-song="${s.id}">${ic('plus')}<span class="tx">${tr(st,'newPl')}…</span></button>
      ${st.playlists.map(p=>{ const has=p.items.includes(s.id); return `<button class="mi ${has?'dis':''}" data-act="addToPl" data-arg="${p.id}" data-song="${s.id}">${ic('list-music')}<span class="tx">${esc(p.name)}<small>${has?tr(st,'plContains'):tr(st,'nSongs',n(st,p.n))}</small></span>${has?ic('check','s'):''}</button>`; }).join('')}`;
  }
  if (sh.type==='timer'){ st.meta2='S15'; return timerSheet(st); }
  if (sh.type==='sort'){
    head = `<div class="sh"><div class="tx"><h4>${tr(st,'sortBy')}</h4><p>${tr(st,'sortHint')}</p></div></div>`;
    body = ['title','artist','added'].map(k=>`<button class="mi" role="radio" aria-checked="${st.sort.key===k}" data-act="sortBy" data-arg="${k}"><span class="rad ${st.sort.key===k?'on':''}"></span><span class="tx">${tr(st,{title:'sortTitle',artist:'sortArtist',added:'sortAdded'}[k])}</span>${st.sort.key===k?ic(st.sort.dir==='asc'?'chevron-up':'chevron-down','s'):''}</button>`).join('');
  }
  if (sh.type==='lens'){
    head = `<div class="sh"><div class="tx"><h4>${L(st,'Browse by','مرور بر اساس')}</h4></div></div>`;
    body = ['songs','playlists','albums','artists','folders'].map(l=>`<button class="mi" data-act="lens" data-arg="${l}">${ic({songs:'music',playlists:'list-music',albums:'disc-3',artists:'user',folders:'folder'}[l])}${tr(st,l)}</button>`).join('');
  }
  if (sh.type==='why'){
    st.meta2='S22';
    const hf=[...st.hidden];
    head = `<div class="sh"><div class="tx"><h4>${tr(st,'whyHidden')}</h4><p>${tr(st,'whyHiddenB')}</p></div></div>`;
    body = hf.map(k=>`<div class="mi">${ic('eye-off')}<span class="tx">${tr(st,'fromFolder',esc(K.fById[k].name))}<small>${tr(st,'nSongs',n(st,K.fById[k].n))}</small></span><button class="btn x" data-act="showFolder" data-arg="${k}">${tr(st,'show')}</button></div>`).join('')
      + (shortHidden(st)?`<div class="mi">${ic('timer')}<span class="tx">${tr(st,'shorterThan',minLabel(st,st.minDur))}<small>${tr(st,'nSongs',n(st,st.hidden.has('DariaValidation')?0:K.fById.DariaValidation.short[st.minDur]||0))}</small></span><button class="btn x" data-act="push" data-arg="settings-duration">${tr(st,'change')}</button></div>`:'')
      + `<div style="padding:8px 20px"><button class="btn t" style="width:100%" data-act="push" data-arg="settings">${tr(st,'libSettings')}</button></div>`;
  }
  if (sh.type==='folder'){
    const f=K.fById[sh.key];
    head = `<div class="sh"><div class="tx"><h4>${esc(f.name)}</h4><p>${esc(f.path)}</p></div></div>`;
    body = `<button class="mi" data-act="playFolder" data-arg="${f.key}">${ic('play')}${tr(st,'play')}</button><button class="mi" data-act="hideFolder" data-arg="${f.key}">${ic('eye-off')}<span class="tx">${tr(st,'hideFolder')}<small>${tr(st,'nSongs',n(st,f.n))} · ${L(st,'Files are not deleted','فایل‌ها حذف نمی‌شوند')}</small></span></button>`;
  }
  if (sh.type==='pl'){
    const p = st.playlists.find(x=>x.id===sh.key);
    head = `<div class="sh"><div class="tx"><h4>${esc(p.name)}</h4><p>${tr(st,'nSongs',n(st,p.n))}</p></div></div>`;
    body = `<button class="mi" data-act="playPlId" data-arg="${p.id}">${ic('play')}${tr(st,'play')}</button><button class="mi" data-act="renamePl" data-arg="${p.id}">${ic('pencil')}${tr(st,'rename')}</button><button class="mi" data-act="deletePl" data-arg="${p.id}" style="color:var(--danger)">${ic('trash-2')}${tr(st,'del')}</button>`;
  }
  if (sh.type==='plItem'){
    const p = st.playlists.find(x=>x.id===top(st).key); const id=p.items[sh.i]; const so=K.byId[id];
    head = `<div class="sh">${K.cover(so,'m',{dark:st.theme==='dark'})}<div class="tx"><h4>${esc(so.t)}</h4><p>${esc(p.name)}</p></div></div>`;
    body = `<button class="mi" data-act="playNext" data-arg="${id}">${ic('list-start')}${tr(st,'playNext')}</button><button class="mi" data-act="addQueue" data-arg="${id}">${ic('list-end')}${tr(st,'addQueue')}</button><div class="hr"></div><button class="mi" data-act="plRemove" data-arg="${sh.i}">${ic('x')}<span class="tx">${tr(st,'removeFromPl')}<small>${L(st,'The file stays on your phone','فایل روی گوشی می‌ماند')}</small></span></button>`;
  }
  if (sh.type==='qItem'){
    const o = st.pb.q.find(x=>x.occ===sh.occ); const so=K.byId[o.id];
    head = `<div class="sh">${K.cover(so,'m',{dark:st.theme==='dark'})}<div class="tx"><h4>${esc(so.t)}</h4><p>${tr(st,'queue')}</p></div></div>`;
    body = `<button class="mi" data-act="qMove" data-arg="${sh.occ}" data-dir="-1">${ic('chevron-up')}${tr(st,'moveUp')}</button><button class="mi" data-act="qMove" data-arg="${sh.occ}" data-dir="1">${ic('chevron-down')}${tr(st,'moveDown')}</button><button class="mi" data-act="qRemove" data-arg="${sh.occ}">${ic('x')}${tr(st,'removeQ')}</button><div class="hr"></div><button class="mi" data-act="sheet" data-arg="addpl" data-song="${so.id}">${ic('list-plus')}${tr(st,'addPl')}…</button>`;
  }
  if (sh.type==='qMenu'){
    head = `<div class="sh"><div class="tx"><h4>${tr(st,'queue')}</h4><p>${tr(st,'fromQ',esc(L(st,st.pb.src[0],st.pb.src[1])))}</p></div></div>`;
    body = `<button class="mi" data-act="saveQueue">${ic('list-plus')}<span class="tx">${tr(st,'saveQ')}<small>${L(st,'Proposal · needs owner approval','پیشنهاد · نیاز به تأیید')}</small></span></button><button class="mi" data-act="clearQueue" style="color:var(--danger)">${ic('trash-2')}${tr(st,'clearQ')}</button>`;
  }
  if (sh.type==='coll'){
    const v = top(st);
    head = `<div class="sh"><div class="tx"><h4>${esc(collItems(st,v).title)}</h4></div></div>`;
    body = `<button class="mi" data-act="collPlayNext">${ic('list-start')}${tr(st,'playNext')}</button><button class="mi" data-act="collAddQueue">${ic('list-end')}${tr(st,'addQueue')}</button>${v.kind==='folder'?`<div class="hr"></div><button class="mi" data-act="hideFolder" data-arg="${v.key}">${ic('eye-off')}<span class="tx">${tr(st,'hideFolder')}<small>${L(st,'Files are not deleted','فایل‌ها حذف نمی‌شوند')}</small></span></button>`:''}`;
  }
  return `<div class="scrim anim-fade" data-act="closeSheet"></div><div class="sheet anim-up" role="dialog" aria-modal="true"><div class="grab" aria-hidden="true"></div>${head}<div class="body">${body}</div></div>`;
}
function timerSheet(st){
  const t = st.tm, s = curSong(st);
  const noSess = !st.pb.session || !s;
  const draft = t.draft;
  const presets = (act) => `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 16px 10px">${[15,30,45,60].map(m=>`<button class="btn o" style="flex-direction:column;gap:0;min-height:64px;border-radius:18px;padding:0" data-act="${act}" data-arg="${m}"><b style="font-size:calc(20px*var(--fs))">${n(st,m)}</b><small style="font-weight:500;color:var(--ink3)">${tr(st,'min')}</small></button>`).join('')}</div>
    <div style="padding:0 16px 10px"><button class="btn o" style="width:100%;justify-content:flex-start;min-height:60px;border-radius:18px" data-act="${act}" data-arg="eos">${ic('music','s')}<span style="text-align:start"><b>${tr(st,'eos')}</b><small style="display:block;font-weight:500;color:var(--ink3)">${tr(st,'eosB')}</small></span></button></div>
    <div style="display:flex;gap:8px;padding:0 16px;align-items:flex-start"><div class="fld" style="flex:1;margin:0"><label for="tm-custom">${tr(st,'custom')}</label><div class="in ${t.err?'err':''}"><input id="tm-custom" data-input="tmCustom" value="${esc(t.custom)}" inputmode="numeric" placeholder="${n(st,20)}"></div><div class="hint ${t.err?'err':''}">${t.err?tr(st,'customErr'):tr(st,'customHint')}</div></div>
    ${draft?'':`<button class="btn o" style="margin-top:22px;min-height:52px" data-act="tmCustomStart">${tr(st,'start')}</button>`}</div>`;
  let body='';
  if (noSess) body = `<p class="explain">${tr(st,'noSession')}</p>`;
  else if (draft){
    const curTxt = t.mode==='dur' ? tr(st,'currentT',n(st,remMin(st))) : tr(st,'currentEos',esc(K.byId[t.targetId].t));
    body = `<p class="explain" style="margin-top:0">${tr(st,'changeTB')}<br><b>${curTxt}</b></p>${presets('tmDraft')}
      ${draft.pick?`<p class="explain"><b>${L(st,'New timer','تایمر تازه')}:</b> ${draft.pick==='eos'?tr(st,'eos'):`${n(st,draft.pick)} ${tr(st,'min')}`}</p>`:''}
      <div class="btns end" style="padding:10px 16px 6px"><button class="btn x" data-act="tmKeep">${tr(st,'keepCur')}</button><button class="btn f ${draft.pick||t.custom?'':'dis'}" data-act="tmApply">${tr(st,'apply')}</button></div>`;
  }
  else if (t.mode==='off') body = presets('tmStart');
  else if (t.mode==='dur'){
    const r = remSec(st);
    body = `<div style="text-align:center;padding:4px 16px 12px" role="timer" aria-live="off"><div style="color:var(--ink2)">${tr(st,'pausingIn')}</div><div style="font-size:calc(46px*var(--fs));font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1">${tm(st,r)}</div><div style="color:var(--ink2);font-size:13.5px">${tr(st,'pausesAt',clockStr(st,t.end))}</div></div>
      ${t.plusErr?`<div class="banner warn">${ic('triangle-alert','s')}<div class="tx">${tr(st,'plus10Err')}</div></div>`:''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px 8px"><button class="btn o" data-act="tmPlus10" ${t.pending?'disabled':''}>${t.pending==='plus'?ic('loader-circle','s spin'):''}${tr(st,'plus10')}</button><button class="btn o" data-act="tmChange">${tr(st,'change')}</button></div>
      <div style="text-align:center;padding:4px"><button class="btn d" data-act="tmCancel">${tr(st,'cancelT')}</button></div>`;
  }
  else if (t.mode==='eos'){
    const ts = K.byId[t.targetId]; const left = Math.max(1,Math.ceil(((ts.d||0) - st.pb.pos)/60));
    body = `<div style="text-align:center;padding:4px 16px 12px"><div style="color:var(--ink2)">${tr(st,'pausingAfter')}</div><div class="bdi" style="font-size:calc(24px*var(--fs));font-weight:700">${esc(ts.t)}</div><div style="color:var(--ink2);font-size:13.5px">${ts.d?tr(st,'aboutLeft',n(st,left)):''}</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 16px 8px"><button class="btn o" data-act="tmChange">${tr(st,'change')}</button><button class="btn d" data-act="tmCancel">${tr(st,'cancelT')}</button></div>`;
  }
  const saveFail = t.saveFailed ? `<div class="banner err">${ic('circle-alert','s')}<div class="tx">${tr(st,'tmSaveFail')}<div><button data-act="tmRetrySave">${tr(st,'retrySave')}</button></div></div></div>` : '';
  const pend = t.pending==='start' ? `<p class="explain" role="status" style="text-align:center">${ic('loader-circle','xs spin')} ${tr(st,'starting')}</p>` : '';
  return `<div class="scrim anim-fade" data-act="closeSheet"></div><div class="sheet anim-up" role="dialog" aria-modal="true" aria-label="${tr(st,'timer')}"><div class="grab" aria-hidden="true"></div>
    <div class="sh"><span style="color:var(--accent)">${ic('moon','l')}</span><div class="tx"><h4>${draft?tr(st,'changeT'):tr(st,'timer')}</h4><p>${tr(st,'tmIntro')}</p></div></div>
    <div class="body">${saveFail}${pend}${body}</div></div>`;
}
function dialogHtml(st){
  const d = st.dialog; if (!d) return '';
  let h='';
  if (d.type==='newPl' || d.type==='renamePl'){
    const err = d.err ? tr(st,d.err, esc(d.v)) : '';
    h = `<h4>${d.type==='newPl'?tr(st,'newPl'):tr(st,'rename')}</h4><div class="fld" style="margin:0 0 6px"><label for="dlg-name">${tr(st,'plName')}</label><div class="in foc ${err?'err':''}"><input id="dlg-name" data-input="dlgName" value="${esc(d.v)}" maxlength="60" dir="auto"></div><div class="hint ${err?'err':''}" style="display:flex;justify-content:space-between"><span>${err}</span><span>${n(st,d.v.length)} / ${n(st,60)}</span></div></div>
      <div class="btns end"><button class="btn x" data-act="closeDialog">${tr(st,'cancel')}</button><button class="btn x" data-act="dlgOk">${d.type==='newPl'?tr(st,'create'):tr(st,'rename')}</button></div>`;
  }
  if (d.type==='deletePl'){ const p = st.playlists.find(x=>x.id===d.id);
    h = `<h4 class="bdi">${tr(st,'delQ',esc(p.name))}</h4><p>${tr(st,'delBody')}</p><div class="btns end"><button class="btn x" data-act="closeDialog">${tr(st,'cancel')}</button><button class="btn x" style="color:var(--danger)" data-act="dlgOk">${tr(st,'del')}</button></div>`; }
  if (d.type==='clearQ') h = `<h4>${tr(st,'clearQQ')}</h4><p>${tr(st,'clearQB')}</p><div class="btns end"><button class="btn x" data-act="closeDialog">${tr(st,'cancel')}</button><button class="btn x" style="color:var(--danger)" data-act="dlgOk">${tr(st,'clearQ')}</button></div>`;
  if (d.type==='discardEdit') h = `<h4>${tr(st,'discardQ')}</h4><p>${tr(st,'discardB')}</p><div class="btns end"><button class="btn x" data-act="closeDialog">${tr(st,'keepEditing')}</button><button class="btn x" style="color:var(--danger)" data-act="dlgOk">${tr(st,'discard')}</button></div>`;
  if (d.type==='discardPick') h = `<h4>${tr(st,'discardSelQ')}</h4><p>${tr(st,'discardSelB',n(st,st.pick.size))}</p><div class="btns end"><button class="btn x" data-act="closeDialog">${tr(st,'keepSel')}</button><button class="btn x" style="color:var(--danger)" data-act="dlgOk">${tr(st,'discard')}</button></div>`;
  return `<div class="dscrim anim-fade"></div><div class="dialog anim-fade" role="alertdialog" aria-modal="true">${h}</div>`;
}
function sysHtml(st){
  const s = st.sys; if (!s) return '';
  const lab = `<span class="lbl">${T.simulated[0]}</span>`;
  let h='';
  if (s.type==='perm') h = `${lab}<h5>${T.sysAllowT[0]}</h5><button class="opt" data-act="sysPerm" data-arg="allow">Allow</button><button class="opt" data-act="sysPerm" data-arg="deny">Don’t allow</button>`;
  if (s.type==='modify') h = `${lab}<h5>Allow Daria Music to modify this audio file?</h5><div style="font-size:13px;color:#444;margin-bottom:8px">${esc(K.byId[st.ed.id].file||K.byId[st.ed.id].t)}</div><button class="opt" data-act="sysModify" data-arg="allow">Allow</button><button class="opt" data-act="sysModify" data-arg="deny">Deny</button>`;
  if (s.type==='share'){ const so=K.byId[s.id]; return `<div class="scrim"></div><div class="sheet" style="font-family:Roboto,system-ui;direction:ltr;text-align:left;background:#F1F3F8;color:#1b1f2a"><span class="simlab" style="top:-30px">${T.simulated[0]}</span><div class="grab"></div><div style="padding:8px 18px 4px;font-size:18px">Sharing 1 file</div><div style="margin:8px 16px;padding:12px;border-radius:14px;background:#e3e7f1;display:flex;gap:10px;align-items:center">${ic('file-audio')}<span><b>${esc(so.file||so.t+'.'+so.fmt.toLowerCase())}</b><br><small>audio/${so.fmt==='MP3'?'mpeg':so.fmt.toLowerCase()} · ${((so.kb||5000)/1024).toFixed(1)} MB</small></span></div><div style="display:flex;gap:18px;justify-content:center;padding:18px 10px 26px">${['Quick Share','Bluetooth','Files','Messages'].map(a=>`<button data-act="sysClose" style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;width:64px"><span style="width:48px;height:48px;border-radius:24px;background:#d5dcf0;display:grid;place-items:center">${ic('share-2','s')}</span>${a}</button>`).join('')}</div><div style="text-align:center;padding-bottom:16px;font-size:12px;color:#555">Daria hands the actual audio file to the app you choose, with temporary read access.</div></div>`; }
  if (s.type==='appSettings') h = `${lab}<h5>App info › Daria Music › Permissions</h5><div style="font-size:13px;margin-bottom:8px">Music and audio: <b>Not allowed</b></div><button class="opt" data-act="sysAppSettings" data-arg="allow">Allow (then return)</button><button class="opt" data-act="sysClose">Return without changing</button>`;
  if (s.type==='pickImage') h = `${lab}<h5>Photo picker</h5><button class="opt" data-act="sysPick" data-arg="ok">Choose illustrative image</button><button class="opt" data-act="sysPick" data-arg="fail">Choose unreadable image (simulate failure)</button><button class="opt" data-act="sysClose">Cancel</button>`;
  if (s.type==='pickLrc') h = `${lab}<h5>Files › Download</h5><button class="opt" data-act="sysLrc" data-arg="ok">Benevis.lrc</button><button class="opt" data-act="sysClose">Cancel</button>`;
  return `<div class="dscrim" style="z-index:79"></div><div class="sysd">${h}</div>`;
}
function snackHtml(st){
  const s = st.snack; if (!s || st.sheet || st.dialog || st.sys) return '';
  const b = st.np ? 92 : (st.pb.session && !compactDock(st) ? 150 : 96);
  return `<div class="snack anim-fade" role="status" aria-live="polite" style="--snack-b:${b}px"><span class="tx">${s.text}</span>${s.undo?`<button data-act="undo">${tr(st,'undo')}</button>`:''}</div>`;
}

/* ---------------- master render ---------------- */
function html(st){
  st.meta2 = null;
  const v = top(st);
  let base='';
  if (v.id==='library') base = scrLibrary(st,v);
  else if (v.id==='collection') base = scrCollection(st,v);
  else if (v.id==='playlist') base = scrPlaylist(st,v);
  else if (v.id==='picker') base = scrPicker(st,v);
  else if (v.id==='search') base = scrSearch(st);
  else if (v.id==='info') base = scrInfo(st,v);
  else if (v.id==='editor') base = scrEditor(st);
  else if (v.id==='settings') base = scrSettings(st);
  else if (v.id==='settings-folders') base = scrSetFolders(st);
  else if (v.id==='settings-duration') base = scrSetDuration(st,v);
  const np = st.np ? scrNowPlaying(st) : '';
  return base + np + sheetHtml(st) + dialogHtml(st) + sysHtml(st) + snackHtml(st);
}
function phone(st, extraCls=''){
  const cls = ['phone', st.scale>1.25?'big wrap':'', st.rm?'rm':'', st.solid?'solid':'', st.land?'land':'', extraCls].join(' ');
  const [w,h] = st.land ? [st.h, st.w] : [st.w, st.h];
  return `<div class="${cls}" data-theme="${st.theme}" dir="${st.lang==='fa'?'rtl':'ltr'}" lang="${st.lang}" style="--fs:${st.scale};--pw:${w}px;--ph:${h}px">${K.statusBar(clockStr(st))}<div class="screen">${html(st)}</div>${K.gestureBar()}</div>`;
}

/* ---------------- actions ---------------- */
function snack(st, text, undo){ st.snack = {text, undo, t:Date.now()}; }
function ctxList(st, ctx){
  const v = top(st);
  if (ctx==='coll' && v.id==='collection') return {items: collItems(st,v).items.filter(s=>visible(st,s)), src:[collItems(st,v).title, collItems(st,v).title], sub:[v.kind==='album'?'Album':v.kind==='artist'?'Artist':v.kind==='folder'?'Folder':'Collection', v.kind==='album'?'آلبوم':v.kind==='artist'?'هنرمند':v.kind==='folder'?'پوشه':'مجموعه']};
  if (ctx==='pl' && v.id==='playlist'){ const p=st.playlists.find(x=>x.id===v.key); return {items:p.items.map(id=>K.byId[id]).filter(s=>v.showHidden||visible(st,s)), src:[p.name,p.name], sub:['Playlist','پلی‌لیست']}; }
  const {key} = st.sort;
  return {items: libSongs(st), src:['Songs','آهنگ‌ها'], sub:[{added:'Recently added',title:'Title',artist:'Artist'}[key], {added:'تازه‌ترین',title:'عنوان',artist:'هنرمند'}[key]]};
}
function playList(st, items, startId, src, sub, shuffle){
  if (!items.length) return;
  let arr = items.map(s=>({occ:++st.occSeq, id:s.id}));
  if (shuffle){ arr = arr.sort(()=>Math.random()-.5); }
  const idx = startId ? Math.max(0, arr.findIndex(o=>o.id===startId)) : 0;
  st.pb.q = arr; st.pb.idx = idx; st.pb.pos = 0; st.pb.playing = true; st.pb.session = true; st.pb.src = src; st.pb.srcSub = sub; st.pb.vOff = 0; st.pb.vTotal = arr.length + (src[0]==='Songs' ? counts(st).songs - arr.length : 0); st.pb.err=null; st.pb.shuffle=!!shuffle;
  retarget(st); onStartSong(st);
}
function onStartSong(st){
  const s = curSong(st);
  if (s && st.missing.has(s.id)){ st.pb.playing=false; st.pb.err='missing'; } else st.pb.err=null;
  if (st.notice==='timerDone' && st.pb.playing) st.notice=null;
}
function retarget(st){ if (st.tm.mode==='eos'){ const c=cur(st); if (c){ st.tm.targetOcc=c.occ; st.tm.targetId=c.id; } } }
function advance(st, dir, natural){
  const q = st.pb.q;
  if (natural && st.tm.mode==='eos' && cur(st) && cur(st).occ===st.tm.targetOcc){ timerFire(st,'eos'); return; }
  if (natural && st.pb.repeat==='one'){ st.pb.pos=0; return; }
  let i = st.pb.idx + dir;
  if (i>=q.length){ if (st.pb.repeat==='all') i=0; else { st.pb.playing=false; st.pb.pos=K.byId[q[st.pb.idx].id].d||0; return; } }
  if (i<0) i=0;
  if (!natural && dir<0 && st.pb.pos>3){ st.pb.pos=0; return; }
  st.pb.idx=i; st.pb.pos=0;
  if (!natural) retarget(st);
  onStartSong(st);
}
function timerFire(st, kind){
  st.pb.playing=false; st.tm.firedAt=st.clock; st.tm.mode='off'; st.tm.draft=st.tm.draft||null; st.notice='timerDone';
  if (kind==='eos'){ const s=curSong(st); st.pb.pos = s.d||st.pb.pos; }
}
function startTimer(st, arg){
  const t = st.tm; t.plusErr=false;
  if (arg==='eos'){ const c=cur(st); t.mode='eos'; t.targetOcc=c.occ; t.targetId=c.id; snack(st, tr(st,'tmEosSet')); }
  else { const m=+arg; t.mode='dur'; t.end = st.clock + m*60000; t.total=m*60; t.lastValid = t.custom && !t.err ? t.custom : t.lastValid; snack(st, tr(st,'tmSet',n(st,m))); }
  t.draft=null; st.notice=null;
  if (st.scen.timerSaveFail) t.saveFailed=true;
}
const ACT = {
  lens(st,a){ st.stack=[{id:'library',lens:a}]; st.sheet=null; },
  push(st,a){ st.sheet=null; st.np=null; if (a==='settings-folders'||a==='settings-duration'){ if (top(st).id==='search') st.stack.pop(); } st.stack.push({id:a}); },
  back(st){ backAction(st); },
  sheet(st,a,el){ st.sheet={type:a, song: el.dataset.song || (a==='addpl' && st.sheet && st.sheet.song) || null, ctx: el.dataset.ctx}; if (a==='timer'){ st.tm.plusErr=false; } },
  closeSheet(st){ if (st.sheet && st.sheet.type==='timer' && st.tm.draft){ st.tm.draft=null; } st.sheet=null; },
  songMenu(st,a,el){ st.sheet={type:'song', song:a, ctx: el.closest('[data-ctx]')?.dataset.ctx || (top(st).id==='collection'?'coll':top(st).id==='playlist'?'pl':'lib')}; },
  playSong(st,a,el){ const ctx = el.dataset.ctx || (st.sheet&&st.sheet.ctx) || 'lib'; const L2 = ctxList(st, ctx==='search'?'lib':ctx); playList(st, L2.items.some(s=>s.id===a)?L2.items:[K.byId[a]], a, L2.src, L2.sub); st.sheet=null; if (ctx==='search'){} },
  toggle(st){ const s=curSong(st); if (!s) return; if (st.pb.err) return; st.pb.playing=!st.pb.playing; if (st.pb.playing) st.notice=null; },
  next(st){ advance(st,1,false); },
  prev(st){ advance(st,-1,false); },
  openNp(st){ st.np={face:st.npFace||'cover', enter:true}; },
  collapse(st){ st.npFace=st.np.face; st.np=null; },
  face(st,a){ st.np.face=a; st.np.enter=false; st.npFace=a; st.qSel=null; },
  fav(st,a){ if (st.fav.has(a)){ st.fav.delete(a); snack(st,tr(st,'favRemoved'),{type:'fav',id:a,was:true}); } else { st.fav.add(a); snack(st,tr(st,'favAdded'),{type:'fav',id:a,was:false}); } },
  playNext(st,a){ const o={occ:++st.occSeq,id:a}; st.pb.q.splice(st.pb.idx+1,0,o); st.pb.vTotal++; st.sheet=null; if (!st.pb.session){ st.pb.session=true; } snack(st,tr(st,'queuedNext',esc(K.byId[a].t)),{type:'qins',occ:o.occ}); },
  addQueue(st,a){ const o={occ:++st.occSeq,id:a}; st.pb.q.push(o); st.pb.vTotal++; st.sheet=null; snack(st,tr(st,'queuedEnd',esc(K.byId[a].t)),{type:'qins',occ:o.occ}); },
  addToPl(st,a,el){ const p=st.playlists.find(x=>x.id===a); const id=el.dataset.song; if (p.items.includes(id)){ snack(st,tr(st,'already',esc(p.name))); return; } p.items.push(id); p.n++; st.sheet=null; snack(st,tr(st,'added',esc(p.name)),{type:'plAdd',pl:a,id}); },
  newPl(st,a,el){ st.dialog={type:'newPl', v:'', song: el.dataset.song||null}; st.sheet=null; },
  renamePl(st,a){ const p=st.playlists.find(x=>x.id===a); st.dialog={type:'renamePl', v:p.name, id:a}; st.sheet=null; },
  deletePl(st,a){ st.dialog={type:'deletePl', id:a}; st.sheet=null; },
  closeDialog(st){ st.dialog=null; },
  dlgOk(st){ const d=st.dialog;
    if (d.type==='newPl'||d.type==='renamePl'){ const v=d.v.trim(); if (!v){ d.err='errBlank'; return; } if (st.playlists.some(p=>p.name.toLowerCase()===v.toLowerCase() && p.id!==d.id)){ d.err='errDup'; return; }
      if (d.type==='newPl'){ const p={id:'p'+Date.now(), name:v, n:0, items:[]}; if (d.song){ p.items.push(d.song); p.n=1; } st.playlists.unshift(p); snack(st, d.song?tr(st,'createdAdded',esc(v)):tr(st,'created',esc(v))); if (!d.song){ st.stack=[{id:'library',lens:'playlists'},{id:'playlist',key:p.id}]; } }
      else { st.playlists.find(p=>p.id===d.id).name=v; }
      st.dialog=null; return; }
    if (d.type==='deletePl'){ const i=st.playlists.findIndex(p=>p.id===d.id); const [p]=st.playlists.splice(i,1); st.dialog=null; if (top(st).id==='playlist') st.stack.pop(); snack(st,tr(st,'deleted',esc(p.name)),{type:'plDel',p,i}); return; }
    if (d.type==='clearQ'){ st.pb.q=[]; st.pb.idx=0; st.pb.session=false; st.pb.playing=false; st.np=null; if (st.tm.mode!=='off'){ st.tm.mode='off'; } st.dialog=null; snack(st,tr(st,'clearQ')); return; }
    if (d.type==='discardEdit'){ st.dialog=null; st.ed=null; st.stack.pop(); return; }
    if (d.type==='discardPick'){ st.dialog=null; st.pick=null; st.stack.pop(); return; }
  },
  openPl(st,a){ st.stack.push({id:'playlist',key:a}); },
  plMenu(st,a){ st.sheet={type:'pl',key:a}; },
  playPlId(st,a){ const p=st.playlists.find(x=>x.id===a); playList(st,p.items.map(id=>K.byId[id]).filter(s=>visible(st,s)),null,[p.name,p.name],['Playlist','پلی‌لیست']); st.sheet=null; },
  playPl(st){ ACT.playPlId(st, top(st).key); },
  shufflePl(st){ const p=st.playlists.find(x=>x.id===top(st).key); playList(st,p.items.map(id=>K.byId[id]).filter(s=>visible(st,s)),null,[p.name,p.name],['Playlist','پلی‌لیست'],true); },
  plItemMenu(st,a){ st.sheet={type:'plItem', i:+a}; },
  plRemove(st,a){ const p=st.playlists.find(x=>x.id===top(st).key); const [id]=p.items.splice(+a,1); p.n--; st.sheet=null; snack(st,tr(st,'removedFromPl',esc(p.name)),{type:'plRem',pl:p.id,id,i:+a}); },
  toggleShowHidden(st){ top(st).showHidden=!top(st).showHidden; },
  openPicker(st){ st.pick=new Set(); st.stack.push({id:'picker', key: top(st).key, q:''}); },
  pickToggle(st,a){ const p=st.playlists.find(x=>x.id===top(st).key); if (st.pick.has(a)) st.pick.delete(a); else st.pick.add(a); },
  pickCommit(st){ const v=top(st); const p=st.playlists.find(x=>x.id===v.key); const add=[...st.pick].filter(id=>!p.items.includes(id)); p.items.push(...add); p.n+=add.length; st.pick=null; st.stack.pop(); snack(st,tr(st,'added',esc(p.name))); },
  openSmart(st,a){ st.stack.push({id:'collection',kind:'smart',key:a}); },
  openAlbum(st,a){ st.stack.push({id:'collection',kind:'album',key:a}); st.sheet=null; },
  openArtist(st,a){ st.stack.push({id:'collection',kind:'artist',key:a}); },
  openFolder(st,a){ st.stack.push({id:'collection',kind:'folder',key:a}); },
  goAlbum(st,a){ const s=K.byId[a]; const al=K.albums.find(x=>x.t===s.al)||K.albums[0]; st.sheet=null; st.np=null; st.stack.push({id:'collection',kind:'album',key:al.id}); },
  goArtist(st,a){ const s=K.byId[a]; const ar=K.artists.find(x=>x.t===s.a)||K.artists[7]; st.sheet=null; st.np=null; st.stack.push({id:'collection',kind:'artist',key:ar.id}); },
  goFolder(st,a){ st.sheet=null; st.np=null; st.stack.push({id:'collection',kind:'folder',key:a}); },
  goSource(st){ const s=st.pb.src[0]; st.np=null; if (s==='Songs') st.stack=[{id:'library',lens:'songs'}]; },
  playColl(st){ const L2=ctxList(st,'coll'); playList(st,L2.items,null,L2.src,L2.sub); },
  shuffleColl(st){ const L2=ctxList(st,'coll'); playList(st,L2.items,null,L2.src,L2.sub,true); },
  shuffleAll(st){ const L2=ctxList(st,'lib'); playList(st,L2.items,null,L2.src,L2.sub,true); },
  collMenu(st){ st.sheet={type:'coll'}; },
  collPlayNext(st){ const items=ctxList(st,'coll').items; st.pb.q.splice(st.pb.idx+1,0,...items.map(s=>({occ:++st.occSeq,id:s.id}))); st.pb.vTotal+=items.length; st.sheet=null; snack(st,tr(st,'queuedNext',esc(collItems(st,top(st)).title))); },
  collAddQueue(st){ const items=ctxList(st,'coll').items; st.pb.q.push(...items.map(s=>({occ:++st.occSeq,id:s.id}))); st.pb.vTotal+=items.length; st.sheet=null; snack(st,tr(st,'queuedEnd',esc(collItems(st,top(st)).title))); },
  playFolder(st,a){ st.sheet=null; const items=K.songs.filter(s=>s.f===a&&visible(st,s)); playList(st,items,null,[K.fById[a].name,K.fById[a].name],['Folder','پوشه']); },
  folderMenu(st,a){ st.sheet={type:'folder',key:a}; },
  hideFolder(st,a){ st.hidden.add(a); st.sheet=null; if (top(st).id==='collection' && top(st).kind==='folder') st.stack.pop(); snack(st,tr(st,'folderHidden',esc(K.fById[a].name),n(st,K.fById[a].n)),{type:'hide',key:a}); },
  showFolder(st,a){ st.hidden.delete(a); if (st.sheet&&st.sheet.type==='why'&&!st.hidden.size&&!shortHidden(st)) st.sheet=null; snack(st,tr(st,'folderShown',esc(K.fById[a].name)),{type:'show',key:a}); },
  toggleFolder(st,a){ if (st.hidden.has(a)) ACT.showFolder(st,a); else { st.hidden.add(a); snack(st,tr(st,'folderHidden',esc(K.fById[a].name),n(st,K.fById[a].n)),{type:'hide',key:a}); } },
  setMin(st,a){ const was=st.minDur; st.minDur=+a; snack(st,tr(st,'minSet',minLabel(st,+a)),{type:'min',was}); },
  toggleUnknown(st){ st.keepUnknown=!st.keepUnknown; snack(st, st.keepUnknown?L(st,'Songs with unknown length are shown','آهنگ‌های با مدت نامشخص نمایش داده می‌شوند'):L(st,'Songs with unknown length are hidden','آهنگ‌های با مدت نامشخص پنهان شدند'),{type:'unk'}); },
  reviewShort(st){ top(st).review=!top(st).review; },
  appearance(st,a){ st.appearance=a; st.theme = a==='system' ? (st.sysTheme||'light') : a; },
  refreshNow(st){ st.refreshing=true; setTimeout(()=>{ st.refreshing=false; st.refreshFailed=false; st.lastRefresh=clockStr(st); snack(st,tr(st,'refreshed')); st._r&&st._r(); }, 1200); },
  retryRefresh(st){ st.refreshFailed=false; st.lastRefresh=clockStr(st); snack(st,tr(st,'refreshed')); },
  sortBy(st,a){ if (st.sort.key===a) st.sort.dir = st.sort.dir==='asc'?'desc':'asc'; else st.sort={key:a,dir:'asc'}; },
  openSearch(st){ st.stack.push({id:'search'}); st.kb=true; st.focus='search-q'; },
  searchType(st,a){ st.search.type=a; },
  setQ(st,a){ st.search.q=a; },
  clearSearch(st){ st.search.q=''; st.focus='search-q'; },
  undo(st){ const u=st.snack&&st.snack.undo; if (!u) return;
    if (u.type==='fav'){ if (u.was) st.fav.add(u.id); else st.fav.delete(u.id); }
    if (u.type==='qins'){ const i=st.pb.q.findIndex(o=>o.occ===u.occ); if (i>st.pb.idx){ st.pb.q.splice(i,1); st.pb.vTotal--; } }
    if (u.type==='plAdd'){ const p=st.playlists.find(x=>x.id===u.pl); const i=p.items.lastIndexOf(u.id); if (i>=0){ p.items.splice(i,1); p.n--; } }
    if (u.type==='plRem'){ const p=st.playlists.find(x=>x.id===u.pl); p.items.splice(u.i,0,u.id); p.n++; }
    if (u.type==='plDel'){ st.playlists.splice(u.i,0,u.p); }
    if (u.type==='hide'){ st.hidden.delete(u.key); }
    if (u.type==='show'){ st.hidden.add(u.key); }
    if (u.type==='min'){ st.minDur=u.was; }
    if (u.type==='unk'){ st.keepUnknown=!st.keepUnknown; }
    if (u.type==='qrem'){ u.items.forEach(([i,o])=>{ st.pb.q.splice(i,0,o); if (i<=st.pb.idx) st.pb.idx++; }); st.pb.vTotal+=u.items.length; }
    st.snack=null; },
  qJump(st,a){ const i=st.pb.q.findIndex(o=>o.occ===+a); if (i<0) return; st.pb.idx=i; st.pb.pos=0; st.pb.playing=true; retarget(st); onStartSong(st); },
  qHist(st){ st.qHist=!st.qHist; },
  qItemMenu(st,a){ st.sheet={type:'qItem',occ:+a}; },
  qMove(st,a,el){ const i=st.pb.q.findIndex(o=>o.occ===+a); const j=i+(+el.dataset.dir); if (j<=st.pb.idx||j>=st.pb.q.length) { st.sheet=null; return; } const [o]=st.pb.q.splice(i,1); st.pb.q.splice(j,0,o); st.sheet=null; },
  qRemove(st,a){ const i=st.pb.q.findIndex(o=>o.occ===+a); const o=st.pb.q[i]; st.pb.q.splice(i,1); if (i<st.pb.idx) st.pb.idx--; st.pb.vTotal--; st.sheet=null; if (st.tm.mode==='eos' && st.tm.targetOcc===o.occ){} snack(st,tr(st,'removedQ'),{type:'qrem',items:[[i,o]]}); },
  qSelect(st){ st.qSel=new Set(); },
  qSelCancel(st){ st.qSel=null; },
  qSelToggle(st,a){ const o=+a; if (st.qSel.has(o)) st.qSel.delete(o); else st.qSel.add(o); },
  qRemoveSel(st){ const curOcc=cur(st).occ; const items=[]; st.pb.q = st.pb.q.filter((o,i)=>{ if (st.qSel.has(o.occ) && o.occ!==curOcc){ items.push([i,o]); return false; } return true; }); st.pb.idx = st.pb.q.findIndex(o=>o.occ===curOcc); st.pb.vTotal-=items.length; snack(st,tr(st,'removedQN',n(st,items.length)),{type:'qrem',items}); st.qSel=null; },
  removeCurQ(st){ const o=cur(st); st.pb.q.splice(st.pb.idx,1); st.pb.vTotal--; if (st.pb.idx>=st.pb.q.length) st.pb.idx=st.pb.q.length-1; st.pb.pos=0; st.pb.playing=false; onStartSong(st); snack(st,tr(st,'removedQ')); },
  clearQueue(st){ st.sheet=null; st.dialog={type:'clearQ'}; },
  saveQueue(st){ st.sheet=null; st.dialog={type:'newPl', v:L(st,'Queue '+clockStr(st),'صف '+clockStr(st)), fromQueue:true}; },
  shuffleT(st){ st.pb.shuffle=!st.pb.shuffle; },
  repeat(st){ st.pb.repeat = {off:'all',all:'one',one:'off'}[st.pb.repeat]; },
  seek(st,a,el,ev){ const s=curSong(st); if (!s.d) return; const r=el.getBoundingClientRect(); st.pb.pos=Math.round(Math.max(0,Math.min(1,(ev.clientX-r.left)/r.width))*s.d); },
  seekTo(st,a){ st.pb.pos=+a; },
  dismissNotice(st){ st.notice=null; },
  tmStart(st,a){ const t=st.tm; t.pending='start'; st._later(()=>{ t.pending=null; startTimer(st,a); st.sheet=null; }, 450); },
  tmCustomStart(st){ const t=st.tm; const v=normDigits(t.custom).trim(); if (!/^\d+$/.test(v)||+v<1||+v>180){ t.err='bad'; return; } t.err=''; t.lastValid=v; ACT.tmStart(st,v); },
  tmPlus10(st){ const t=st.tm; if (remSec(st)+600 > 180*60){ t.plusErr=true; return; } t.pending='plus'; st._later(()=>{ t.pending=null; t.end+=600000; t.total+=600; snack(st, L(st,'Added 10 minutes','۱۰ دقیقه اضافه شد')); if (st.scen.timerSaveFail) t.saveFailed=true; },350); },
  tmChange(st){ st.tm.draft={pick:null}; st.tm.plusErr=false; st.tm.custom=st.tm.lastValid||''; st.tm.err=''; },
  tmDraft(st,a){ st.tm.draft.pick=a; st.tm.custom=''; st.tm.err=''; },
  tmKeep(st){ st.tm.draft=null; },
  tmApply(st){ const t=st.tm; let pick=t.draft.pick; if (!pick && t.custom){ const v=normDigits(t.custom).trim(); if (!/^\d+$/.test(v)||+v<1||+v>180){ t.err='bad'; return; } pick=v; t.lastValid=v; } if (!pick) return; startTimer(st,pick); st.sheet=null; },
  tmCancel(st){ st.tm.mode='off'; st.tm.draft=null; st.tm.saveFailed=false; snack(st,tr(st,'tmCancelled')); st.sheet=null; },
  tmRetrySave(st){ st.tm.saveFailed=false; st.scen.timerSaveFail=false; snack(st,tr(st,'savedOk')); },
  info(st,a){ st.sheet=null; st.np=null; st.stack.push({id:'info',key:a}); },
  openLyrics(st){ const id=top(st).key; st.stack.pop(); const i=st.pb.q.findIndex(o=>o.id===id); if (i>=0 && curSong(st).id!==id){ } st.np={face:'lyrics',enter:true}; },
  importLyrics(st){ st.sys={type:'pickLrc'}; },
  sysLrc(st){ st.lyrImported.add(curSong(st).id); st.sys=null; snack(st,tr(st,'lyrImported')); },
  share(st,a){ st.sheet=null; if (st.missing.has(a)){ snack(st,tr(st,'shareMissing')); return; } st.sys={type:'share',id:a}; },
  sysClose(st){ st.sys=null; },
  edit(st,a){ const s=K.byId[a]; const o={t:s.t, a:s.a||'', al:s.al||'', aa:'', y:s.year?String(s.year):'', tr:'', g:''}; st.ed={id:a, o, v:{...o}, cover:'keep', status:null}; st.stack.push({id:'editor'}); },
  coverMode(st,a){ if (a==='new'){ st.sys={type:'pickImage'}; return; } st.ed.cover=a; },
  sysPick(st,a){ st.sys=null; if (a==='ok') st.ed.cover='new'; else snack(st, L(st,'That image couldn’t be read. Choose a JPEG or PNG image.','این تصویر خوانده نشد. JPEG یا PNG انتخاب کنید.')); },
  saveEdit(st){ const e=st.ed; if (FIELDS.map(k=>validate(k,e.v[k])).some(Boolean)) return; if (st.scen.editFail==='ext'){ e.status='ext'; return; } st.sys={type:'modify'}; },
  sysModify(st,a){ st.sys=null; const e=st.ed; if (a==='deny'){ e.status='denied'; return; }
    e.status='saving'; const wasPlaying = st.pb.playing && curSong(st) && curSong(st).id===e.id;
    st._later(()=>{ const f=st.scen.editFail; if (f==='write'){ e.status='writeFail'; return; } if (f==='space'){ e.status='space'; return; }
      const saved={t:e.v.t, a:e.v.a}; st.ed=null; st.stack.pop(); const v=top(st); if (v.id==='info'){ v.pending=true; v.saved=saved; } snack(st,tr(st,'savedFile')); }, 1300); },
  reloadTags(st){ st.ed.status=null; st.scen.editFail=null; snack(st, L(st,'Tags reloaded. Your edits are kept below.','برچسب‌ها دوباره خوانده شد.')); },
  restoreOrig(st){ st.ed.status=null; st.scen.editFail=null; snack(st,tr(st,'restored')); },
  askPerm(st){ st.sys={type:'perm'}; },
  sysPerm(st,a){ st.sys=null; if (a==='allow'){ st.perm='granted'; st.lib='loading'; st._later(()=>{ st.lib='ready'; },1400); } else { st.perm = st.perm==='denied' ? 'blocked' : 'denied'; } },
  openAppSettings(st){ st.sys={type:'appSettings'}; },
  sysAppSettings(st){ st.sys=null; st.perm='granted'; st.lib='loading'; st._later(()=>{ st.lib='ready'; },1200); },
  checkAgain(st){ if (st.perm==='blocked') return; st.lib='loading'; st._later(()=>{ st.lib='ready'; },1200); },
};
function backAction(st){
  if (st.sys){ st.sys=null; return; }
  if (st.dialog){ st.dialog=null; return; }
  if (st.sheet){ ACT.closeSheet(st); return; }
  if (st.np){ if (st.qSel){ st.qSel=null; return; } ACT.collapse(st); return; }
  const v = top(st);
  if (v.id==='editor'){ const e=st.ed; const dirty = FIELDS.some(k=>e.v[k]!==e.o[k]) || e.cover!=='keep'; if (dirty){ st.dialog={type:'discardEdit'}; return; } st.ed=null; }
  if (v.id==='picker' && st.pick && st.pick.size){ st.dialog={type:'discardPick'}; return; }
  if (v.id==='search'){ st.kb=false; }
  if (st.stack.length>1){ st.stack.pop(); return; }
  if (v.id==='library' && v.lens!=='songs'){ st.stack=[{id:'library',lens:'songs'}]; return; }
  snack(st, tr(st,'exitApp'));
}

/* ---------------- tick (simulated time) ---------------- */
function tick(st, secs=1){
  st.clock += secs*1000;
  if (st.pb.playing && st.pb.session){
    const s = curSong(st);
    st.pb.pos += secs;
    if (s.d && st.pb.pos >= s.d) advance(st,1,true);
  }
  if (st.tm.mode==='dur' && st.clock >= st.tm.end) timerFire(st,'dur');
  if (st.snack && Date.now()-st.snack.t > 6000) st.snack=null;
}

/* ---------------- mount ---------------- */
function mount(host, st, o={}){
  st._later = (fn,ms) => setTimeout(()=>{ fn(); draw(); }, ms);
  st._r = () => draw();
  const scrolls = {};
  const ac = new AbortController(); const sig = {signal: ac.signal};
  function draw(){
    const ph = host.querySelector('.phone');
    if (ph) ph.querySelectorAll('[data-scroll]').forEach(el=>{ scrolls[el.dataset.scroll]=el.scrollTop; });
    const active = document.activeElement && host.contains(document.activeElement) ? document.activeElement.id : null;
    st._curObj = cur(st);
    host.innerHTML = phone(st);
    host.querySelectorAll('[data-scroll]').forEach(el=>{ if (scrolls[el.dataset.scroll]!=null) el.scrollTop = scrolls[el.dataset.scroll]; });
    const ly = host.querySelector('.lyr[data-cur]'); if (ly){ const p=ly.querySelectorAll('p')[+ly.dataset.cur]; if (p && !ly._user) ly.scrollTop = Math.max(0,p.offsetTop - ly.clientHeight*0.38); }
    const f = st.focus || active; st.focus=null;
    if (f){ const el=host.querySelector('#'+f); if (el){ el.focus(); if (el.setSelectionRange && el.value!=null){ const L2=el.value.length; try{el.setSelectionRange(L2,L2);}catch(e){} } } }
    if (st.np) st.np.enter=false;
    o.onRender && o.onRender(st);
  }
  host.addEventListener('click', ev=>{
    const el = ev.target.closest('[data-act]'); if (!el || !host.contains(el)) return;
    const fn = ACT[el.dataset.act]; if (!fn) return;
    ev.preventDefault();
    fn(st, el.dataset.arg, el, ev); draw();
  }, sig);
  host.addEventListener('input', ev=>{
    const el = ev.target; const k = el.dataset.input; if (!k) return;
    if (k==='searchQ'){ st.search.q = el.value; const r=host.querySelector('#search-results'); if (r) r.innerHTML = searchResults(st); return; }
    if (k==='pickQ'){ top(st).q = el.value; st.focus='pick-q'; draw(); return; }
    if (k==='ed'){ st.ed.v[el.dataset.k]=el.value; st.focus=el.id; draw(); return; }
    if (k==='tmCustom'){ st.tm.custom=el.value; st.tm.err=''; if (st.tm.draft) st.tm.draft.pick=null; st.focus=el.id; draw(); return; }
    if (k==='dlgName'){ st.dialog.v=el.value; st.dialog.err=null; st.focus=el.id; draw(); return; }
  }, sig);
  host.addEventListener('keydown', ev=>{ if (ev.key==='Enter' && ev.target.id==='dlg-name'){ ACT.dlgOk(st); draw(); } if (ev.key==='Escape'){ backAction(st); draw(); } }, sig);
  host.addEventListener('scroll', ev=>{ if (ev.target.classList && ev.target.classList.contains('lyr')) ev.target._user=true; }, {capture:true, signal: ac.signal});
  let timer = setInterval(()=>{ const before = JSON.stringify([st.pb.pos,st.tm.mode,st.notice,!!st.snack,st.pb.idx]); tick(st,1); const after=JSON.stringify([st.pb.pos,st.tm.mode,st.notice,!!st.snack,st.pb.idx]);
    if (before!==after && !host.contains(document.activeElement)) draw(); else if (before!==after && document.activeElement && document.activeElement.tagName!=='INPUT') draw(); }, 1000);
  draw();
  return {st, draw, act:(name,arg)=>{ ACT[name](st,arg,{dataset:{}},{}); draw(); }, back:()=>{ backAction(st); draw(); }, tick:(s)=>{ tick(st,s); draw(); }, stop:()=>{ clearInterval(timer); ac.abort(); }};
}

K.App = {init, html, phone, mount, ACT, tick, T, tr, counts, backAction};
})();
