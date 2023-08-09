<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :height="card.height"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Seungmin & Yujin', src: require("../images/home_ys.jpg"), flex: 12, height:'300px' },
        { title: 'Favorite trips', src: require("../images/home_yujin.jpg"), flex: 6, height:'200px' },
        { title: 'Best Foods', src: require("../images/home_food_wine.jpg"), flex: 6, height:'200px' },
      ],
    }),

  }
</script>