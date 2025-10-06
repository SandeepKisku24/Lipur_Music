// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Playlist, Song } from '../types/types';
// import { NewPlaylistModal } from './NewPlayListModal';


// interface Props {
//   isVisible: boolean;
//   onClose: () => void;
//   playlists: Playlist[];
//   onCreatePlaylist: (newPlaylist: Omit<Playlist, 'songs'>) => Promise<void>;
//   onAddSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
//   selectedSong: Song;
// }

// export const PlaylistModal: React.FC<Props> = ({
//   isVisible,
//   onClose,
//   playlists,
//   onCreatePlaylist,
//   onAddSongToPlaylist,
//   selectedSong,
// }) => {
//   const [isNewPlaylistModalVisible, setNewPlaylistModalVisible] = useState(false);
//   const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

//   const togglePlaylistSelection = async (playlistId: string) => {
//     if (selectedPlaylists.includes(playlistId)) {
//       setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
//     } else {
//       setSelectedPlaylists([...selectedPlaylists, playlistId]);
//       await onAddSongToPlaylist(playlistId, selectedSong);
//     }
//   };

//   const renderPlaylist = ({ item }: { item: Playlist }) => (
//     <TouchableOpacity
//       style={styles.playlistItem}
//       onPress={() => togglePlaylistSelection(item.id)}
//     >
//       <Text style={styles.playlistName}>{item.name}</Text>
//       {selectedPlaylists.includes(item.id) && (
//         <Ionicons name="checkmark" size={20} color="#000" />
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <Modal
//         visible={isVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={onClose}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add to Playlist</Text>
//             <TouchableOpacity
//               style={styles.newPlaylistButton}
//               onPress={() => setNewPlaylistModalVisible(true)}
//             >
//               <Ionicons name="add" size={20} color="#000" />
//               <Text style={styles.newPlaylistText}>New Playlist</Text>
//             </TouchableOpacity>
//             <FlatList
//               data={playlists}
//               renderItem={renderPlaylist}
//               keyExtractor={(item) => item.id}
//               ListEmptyComponent={<Text style={styles.emptyText}>No playlists yet.</Text>}
//             />
//             <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <NewPlaylistModal
//         isVisible={isNewPlaylistModalVisible}
//         onClose={() => setNewPlaylistModalVisible(false)}
//         onCreate={async (newPlaylist) => {
//           await onCreatePlaylist(newPlaylist);
//           setNewPlaylistModalVisible(false);
//           setSelectedPlaylists([...selectedPlaylists, newPlaylist.id]);
//           await onAddSongToPlaylist(newPlaylist.id, selectedSong);
//         }}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   newPlaylistButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   newPlaylistText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   playlistItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   playlistName: {
//     fontSize: 16,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 20,
//   },
//   closeButton: {
//     backgroundColor: '#000',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });